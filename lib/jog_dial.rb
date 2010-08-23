class JogDial
  def self.scroll(amount)
    event = CGEventCreateScrollWheelEvent(nil, KCGScrollEventUnitPixel, 2, -amount)
    CGEventPost KCGHIDEventTap, event
    CFRelease event
  end
end
