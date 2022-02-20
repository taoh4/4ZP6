//
//  SuggestedHolding.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import SwiftUI

func feelWorks() {
    if let window = UIApplication.shared.windows.first {
        window.rootViewController = UIHostingController(rootView: FeelWorks())
        window.makeKeyAndVisible()
    }
}

struct SuggestedHolding: View{
    var body: some View{
        VStack{

            Text("Suggested way of holding the phone:")
                .font(.largeTitle)
                .padding()
            Text("Place it on a flat surface.")
                .font(.title)
                .padding()
            Text("Or hold it with the hand with less tremor.")
                .font(.title)
                .padding()
            Button(action: feelWorks) {
                Text("Next")
                    .padding()
                    .foregroundColor(Color.white)
                    .frame(width: 120.0)
                    .background(Color.blue)
                    .cornerRadius(16)
            }
        }
    }
}

struct SuggestedHolding_Previews: PreviewProvider {
    static var previews: some View {
        SuggestedHolding()
    }
}
