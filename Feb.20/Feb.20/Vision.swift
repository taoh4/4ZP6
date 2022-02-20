//
//  Vision.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import Foundation
import SwiftUI

func visionPage() {
    if let window = UIApplication.shared.windows.first {
        window.rootViewController = UIHostingController(rootView: VisionView())
        window.makeKeyAndVisible()
    }
}

var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var colors = [Color.red,Color.green,Color.blue,Color.yellow,Color.black]


class Question{
    var letter: String
    var color: Color
    var opacity: Int
    var position: Int
    var choices = [String](repeating: "", count:4)
        
    init() {
        self.letter = alphabet.randomElement()!
        self.color = colors.randomElement()!
        self.position = Int.random(in:0..<4)
        self.opacity = Int.random(in:1..<5)*25
        generateChoices()
    }
    
    func generateChoices() {
        if (self.letter=="O" || self.letter=="Q" || self.letter=="U" || self.letter=="G"){
            self.choices = ["O","Q","U","G"].shuffled()
        } else if (self.letter=="X" || self.letter=="Y" || self.letter=="W" || self.letter=="V") {
            self.choices = ["X","Y","W","V"].shuffled()
        } else if (self.letter=="B" || self.letter=="E" || self.letter=="F" || self.letter=="D") {
            self.choices = ["B","E","F","D"].shuffled()
        } else if (self.letter=="P" || self.letter=="R" || self.letter=="H" || self.letter=="K") {
            self.choices = ["P","R","H","K"].shuffled()
        } else {
            randomPosition()
        }
    }
    
    func nonReapting(current:Int) -> String{
        var temporary = alphabet.randomElement()!
        while self.letter == temporary {
            temporary = alphabet.randomElement()!
        }
        for j in 0...current {
            if self.choices[j] == temporary {
                nonReapting(current: current)
            }
        }
        return temporary
    }
    
    func randomPosition() {
        for i in 0...3{
            if i == self.position{
                self.choices[i] = self.letter
            } else {
                self.choices[i] = nonReapting(current: i)
            }
        }
    }
    
}

struct VisionView: View {
    var question = Question()
    
    var body: some View{
        VStack{
            Text("Choose the letter you see")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(Color.red)
                .multilineTextAlignment(.center)
                .padding()
            Text(question.letter)
                .font(.system(size: 300, weight: .bold, design: .default))
                .foregroundColor(question.color)
                .opacity(Double(question.opacity)/100.0)
            //Text(String(question.opacity))
            Button(action: visionPage) {
                Text(question.choices[0])
                    .font(.title)
                    .padding()
                    .foregroundColor(Color.white)
                    .frame(width: 120.0)
                    .background(Color.blue)
                    .cornerRadius(16)
            }
            Button(action: visionPage) {
                Text(question.choices[1])
                    .padding()
                    .font(.title)
                    .foregroundColor(Color.white)
                    .frame(width: 120.0)
                    .background(Color.blue)
                    .cornerRadius(16)
            }
            Button(action: visionPage) {
                Text(question.choices[2])
                    .padding()
                    .font(.title)
                    .foregroundColor(Color.white)
                    .frame(width: 120.0)
                    .background(Color.blue)
                    .cornerRadius(16)
            }
            Button(action: visionPage) {
                Text(question.choices[3])
                    .padding()
                    .font(.title)
                    .foregroundColor(Color.white)
                    .frame(width: 120.0)
                    .background(Color.blue)
                    .cornerRadius(16)
            }
        }
        //.onTapGesture(perform: {
            
        //})
    }
}

struct VisionView_Previews: PreviewProvider {
    static var previews: some View {
        VisionView()
    }
}
