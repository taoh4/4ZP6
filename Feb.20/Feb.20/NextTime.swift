//
//  NextTime.swift
//  Feb.20
//
//  Created by Hailan Kan on 2022-02-20.
//

import SwiftUI
import UserNotifications


struct NextTime: View{
    
    @State private var pickedTime = Date()
    
    private func scheduleNotifications(){
        let content = UNMutableNotificationContent()
        content.title = "Reminder"
        content.body = "your scheduled notification"
        content.sound = .default

        let trigger = UNCalendarNotificationTrigger(dateMatching: Calendar.current.dateComponents([.day, .month, .year, .hour, .minute],
         from: pickedTime), repeats: false)
        
        let uuidString = UUID().uuidString

        let request = UNNotificationRequest(identifier: uuidString, content: content, trigger: trigger)

        UNUserNotificationCenter.current().add(request) { error in
        guard error == nil else { return }
        }
    }
    
    var body: some View{
        VStack{
            Text("What is the time that you would like to receive notification?")
                .font(.headline)
            DatePicker("", selection: $pickedTime, displayedComponents:.hourAndMinute)
                .labelsHidden()
                .datePickerStyle(WheelDatePickerStyle())
            Text("I will notify you  based on the time you choose.")
                .padding()
            //Text("I will also notify and encourage you to play at least once before you take the medicine.")
                .padding()
            Image("drug")
                .frame(width: 200, height: 200, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
                .padding()
            Button("Next") {
                scheduleNotifications()
                visionPage()
            }
            
        }
    }
}

struct NextTime_Previews: PreviewProvider {
    static var previews: some View {
        NextTime()
    }
}
