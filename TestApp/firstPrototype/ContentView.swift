//
//  ContentView.swift
//  firstPrototype
//
//  Created by SpicaE on 2022-01-11.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        return ZStack(content: {
            Text("Hello World").font(Font.largeTitle)
        })
            .foregroundColor(Color.orange)
            .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
