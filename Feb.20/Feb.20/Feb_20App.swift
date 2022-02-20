//
//  Feb_20App.swift
//  Feb.20
//
//  Created by SpicaE on 2022/2/20.
//

import SwiftUI
import UserNotifications

@main
struct Feb_20App: App {
    let center = UNUserNotificationCenter.current()
    
    init(){
        center.requestAuthorization(options: [.sound , .alert , .badge ], completionHandler: { (granted, error) in
                    if let error = error {
                        // Handle the error here.
                        print(error.localizedDescription)
                    }
                    // Enable or disable features based on the authorization.
                })
    }
    
    var body: some Scene {
        WindowGroup {
            //spatialMemory()
            VisionView()
        }
    }
}
