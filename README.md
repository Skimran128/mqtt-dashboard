# ESP32-Based Emergency Communication System Using ESP-NOW & MQTT

## Overview

This project implements an Emergency Communication System using two ESP32 devices. The system uses ESP-NOW for direct device-to-device communication and MQTT for cloud-based monitoring through a web dashboard.

## Features

* Bidirectional ESP-NOW communication
* Emergency and Safe mode switching
* Real-time LED and buzzer alerts
* 16×2 I2C LCD status display
* MQTT cloud monitoring
* Web dashboard visualization
* Online/Offline detection using MQTT LWT
* Works even without internet for local communication

## Hardware Components

* ESP32 Development Board × 2
* 16×2 I2C LCD Display
* Push Button
* LED
* Buzzer
* USB Power Supply

## Software Technologies

* Arduino IDE
* ESP-NOW
* MQTT Protocol
* HiveMQ Broker
* HTML
* CSS
* JavaScript

## System Architecture

ESP32 Device 1 <---- ESP-NOW ----> ESP32 Device 2

```
    |                           |
    +-------- MQTT ------------+
                |
        HiveMQ Broker
                |
        Web Dashboard
```

## Working

1. Press the button on either ESP32.
2. Device switches between SAFE and EMERGENCY states.
3. LED and buzzer indicate the current status.
4. LCD displays the status message.
5. ESP-NOW synchronizes the state with the other device.
6. MQTT publishes updates to the cloud dashboard.
7. Dashboard displays device and emergency status in real time.

## MQTT Topics

### Device Status

project/esp32/device1/status

### Emergency Status

project/esp32/device1/emergency

### Status Values

* ONLINE
* OFFLINE
* EMERGENCY
* SAFE

## Results

* Successful real-time communication between ESP32 devices.
* Emergency alerts synchronized using ESP-NOW.
* MQTT dashboard updates status instantly.
* Online/Offline monitoring implemented using MQTT Last Will and Testament (LWT).

## Applications

* Disaster Management
* Industrial Safety
* Campus Alert Systems
* Smart Buildings
* Public Safety Monitoring

## Future Enhancements

* GPS Integration
* Mobile Application
* Multi-node Mesh Network
* SMS & Email Notifications

## Team Members

* Shaik Imran

## License

This project is developed for academic and educational purposes.

## Authors

Shaik Imran - Final Year Project – Wireless Networks & IoT
