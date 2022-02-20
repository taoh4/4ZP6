//
//  CollectVoiceView.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import SwiftUI

func sitPage() {
    if let window = UIApplication.shared.windows.first {
        window.rootViewController = UIHostingController(rootView: SitView())
        window.makeKeyAndVisible()
    }
}

struct CollectVoiceView: View {
    var body: some View{
            VStack{
                Text("Note")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(Color.red)
                    .bold()
                    .padding()
                Text("This application may collect information of your voice.")
                    .font(.headline)
                    .padding()
                Image("mic")
                    .padding()
                //NavigationLink(destination: SitView().navigationBarBackButtonHidden(true)) {
                    //Text("Next")
                        //.foregroundColor(Color.white)
                        //.frame(width: 200.0, height: 50.0)
                        //.background(Color.blue)
                        //.cornerRadius(10)
                //}
                Button(action: sitPage) {
                    Text("Next")
                        .padding()
                        .foregroundColor(Color.white)
                        .frame(width: 120.0)
                        .background(Color.blue)
                        .cornerRadius(16)
                }
            }
            //.onTapGesture(perform: {
                //sitPage()
            //})
        
    }
}

struct CollectVoiceView_Previews: PreviewProvider {
    static var previews: some View {
        CollectVoiceView()
    }
}

