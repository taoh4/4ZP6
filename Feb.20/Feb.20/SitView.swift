//
//  SitView.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import SwiftUI

func suggestedHolding() {
    if let window = UIApplication.shared.windows.first {
        window.rootViewController = UIHostingController(rootView: SuggestedHolding())
        window.makeKeyAndVisible()
    }
}

struct SitView: View {
    var body: some View{
        VStack{
            Text("Note")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(Color.red)
                .multilineTextAlignment(.center)
                .padding()
            Text("Please sit down and find yourself comfortable.")
                .font(.headline)
                .padding()
            Image("sit")
                .padding()
            Button(action: suggestedHolding) {
                Text("Next")
                    .padding()
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

struct SitView_Previews: PreviewProvider {
    static var previews: some View {
        SitView()
    }
}
