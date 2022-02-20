//
//  FeelWorks.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import SwiftUI

func notiPage() {
    if let window = UIApplication.shared.windows.first {
        window.rootViewController = UIHostingController(rootView: NextTime())
        window.makeKeyAndVisible()
    }
}

struct FeelWorks: View{
    var body: some View{
        VStack{
            Text("Can you feel the medicine is working?")
                .font(.largeTitle)
                .padding()
            Button(action:{notiPage()}, label: {Text("Yes")})
                .padding()
            Button(action:{notiPage()}, label: {Text("No")})
            Image("drug")
        }
    }
}

struct FeelWorks_Previews: PreviewProvider {
    static var previews: some View {
        FeelWorks()
    }
}
