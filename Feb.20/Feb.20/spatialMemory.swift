//
//  ContentView.swift
//  spatialMemory
//
//  Created by SpicaE on 2022/1/29.
//

import UIKit
import SwiftUI
import Foundation

// Our UIKit to SwiftUI wrapper view
struct TouchLocatingView: UIViewRepresentable {
    // The types of touches users want to be notified about
    struct TouchType: OptionSet {
        let rawValue: Int

        static let started = TouchType(rawValue: 1 << 0)
        static let moved = TouchType(rawValue: 1 << 1)
        static let ended = TouchType(rawValue: 1 << 2)
        static let all: TouchType = [.started, .moved, .ended]
    }

    // A closer to call when touch data has arrived
    var onUpdate: (CGPoint) -> Void

    // The list of touch types to be notified of
    var types = TouchType.all

    // Whether touch information should continue after the user's finger has left the view
    var limitToBounds = true

    func makeUIView(context: Context) -> TouchLocatingUIView {
        // Create the underlying UIView, passing in our configuration
        let view = TouchLocatingUIView()
        view.onUpdate = onUpdate
        view.touchTypes = types
        view.limitToBounds = limitToBounds
        return view
    }

    func updateUIView(_ uiView: TouchLocatingUIView, context: Context) {
    }

    // The internal UIView responsible for catching taps
    class TouchLocatingUIView: UIView {
        // Internal copies of our settings
        var onUpdate: ((CGPoint) -> Void)?
        var touchTypes: TouchLocatingView.TouchType = .all
        var limitToBounds = true

        // Our main initializer, making sure interaction is enabled.
        override init(frame: CGRect) {
            super.init(frame: frame)
            isUserInteractionEnabled = true
        }

        // Just in case you're using storyboards!
        required init?(coder: NSCoder) {
            super.init(coder: coder)
            isUserInteractionEnabled = true
        }

        // Triggered when a touch starts.
        override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
            guard let touch = touches.first else { return }
            let location = touch.location(in: self)
            send(location, forEvent: .started)
        }

        // Triggered when an existing touch moves.
        override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
            guard let touch = touches.first else { return }
            let location = touch.location(in: self)
            send(location, forEvent: .moved)
        }

        // Triggered when the user lifts a finger.
        override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
            guard let touch = touches.first else { return }
            let location = touch.location(in: self)
            send(location, forEvent: .ended)
        }

        // Triggered when the user's touch is interrupted, e.g. by a low battery alert.
        override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
            guard let touch = touches.first else { return }
            let location = touch.location(in: self)
            send(location, forEvent: .ended)
        }

        // Send a touch location only if the user asked for it
        func send(_ location: CGPoint, forEvent event: TouchLocatingView.TouchType) {
            guard touchTypes.contains(event) else {
                return
            }

            if limitToBounds == false || bounds.contains(location) {
                onUpdate?(CGPoint(x: round(location.x), y: round(location.y)))
            }
        }
    }
}

// A custom SwiftUI view modifier that overlays a view with our UIView subclass.
struct TouchLocater: ViewModifier {
    var type: TouchLocatingView.TouchType = .all
    var limitToBounds = true
    let perform: (CGPoint) -> Void

    func body(content: Content) -> some View {
        content
            .overlay(
                TouchLocatingView(onUpdate: perform, types: type, limitToBounds: limitToBounds)
            )
    }
}

func updateLocation(_ location: CGPoint) {
        print(location)
}

// A new method on View that makes it easier to apply our touch locater view.
extension View {
    func onTouch(type: TouchLocatingView.TouchType = .all, limitToBounds: Bool = true, perform: @escaping (CGPoint) -> Void) -> some View {
        self.modifier(TouchLocater(type: type, limitToBounds: limitToBounds, perform: perform))
    }
}

struct spatialMemory: View {
    var count:Int
    var game: MemoryGame<String>
    var columns: Array<GridItem>
    var seq: Array<Int>
    var success = false
    let MAX = 5
    init(){
        self.count=6
        self.game = MemoryGame(numberOfCards: count) //change this
        columns = Array(repeating: GridItem(.flexible(), spacing: 20), count: count) // change this
        seq = Array<Int>()
        for _ in 0..<count*count {
            seq.append(Int.random(in:0...count))
        }
    }

    var body: some View {
        
        VStack{
            LazyVGrid(columns: columns, spacing: 20){
                ForEach(game.cards) {card in
                    CardView(widthHeight: CGFloat(100-8*count), card:card)
                }
            }
        }
            .foregroundColor(Color.orange)
            .padding()
            .font(Font.largeTitle)
            .onTouch(type: .started, perform: updateLocation)
         /*
        VStack {
                    Text("This will track all touches, inside bounds only.")
                        .padding()
                        .background(.red)
                        .onTouch(perform: updateLocation)

                    Text("This will track all touches, ignoring bounds – you can start a touch inside, then carry on moving it outside.")
                        .padding()
                        .background(.blue)
                        .onTouch(limitToBounds: false, perform: updateLocation)

                    Text("This will track only starting touches, inside bounds only.")
                        .padding()
                        .background(.green)
                        .onTouch(type: .started, perform: updateLocation)
                }
          */
    }

    private func colorChange(card: Card) {
        // first toggle makes it red
        card.isClicked.toggle()
        
        // wait for 1 second
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(1), execute: {
            // Back to normal with ease animation
            withAnimation(.easeIn){
                card.isClicked.toggle()
            }
        })
    }
}

struct CardView: View {
    var widthHeight: CGFloat
    var card: Card
    var body: some View {
        ZStack{
            if(card.isClicked){
                RoundedRectangle(cornerRadius: 10.0).fill(Color.white)
                RoundedRectangle(cornerRadius: 10.0).stroke(lineWidth: 3.0)
            }else{
                RoundedRectangle(cornerRadius: 10.0).fill(Color.red)
            }
        }
        .frame(width:widthHeight, height: widthHeight) // change this
    }
}

class Card: Identifiable {
    var id: Int
    @State var isClicked: Bool = false
    @State var isMatched: Bool = false
    init (id: Int) {
        self.id = id
    }
}

struct MemoryGame<CardContent>{
    var cards: Array<Card>
    var numberOfCards: Int
    
    mutating func choose(card: Card) {
        print("card chosen: \(card)")
        let chosenIndex: Int = self.index(of: card)
        self.cards[chosenIndex].isClicked = !self.cards[chosenIndex].isClicked
    }

    func index(of card: Card) -> Int {
        for index in 0..<self.cards.count {
            if self.cards[index].id == card.id {
                return index
            }
        }
        return 0 // TODO: bogus
    }
    
    init(numberOfCards: Int) {
        self.numberOfCards = numberOfCards
        cards = Array<Card>()
        for i in 0..<numberOfCards*numberOfCards {
            cards.append(Card(id: i))
        }
    }
}
