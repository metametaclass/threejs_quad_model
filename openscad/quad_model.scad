
angle = 75;

arm_length = 250;
arm_width = 10;
arm_thickness = 5;

frame_height = 28;
frame_width = 45;

//race,freestyle bus
frame_length = 140; //90,140

plate_thickness = 2;

battery_length = 75;
battery_width = 40;
battery_height = 35;

standoff_offset = 4;

battery_up=false;

color("#404040") 
  plate(0);

color("#404040") 
  plate(frame_height);
  
color("#404040") 
  plate(-arm_thickness-plate_thickness);  

x_standoff = frame_width/2-standoff_offset;
y_standoff = frame_length/2-standoff_offset;

standoff(x_standoff, y_standoff, 0);
standoff(x_standoff, -y_standoff, 0);
standoff(-x_standoff, -y_standoff, 0);
standoff(-x_standoff, y_standoff, 0);


color("#404040") 
 arm(90-angle/2);

color("#404040") 
 arm(90+angle/2);

stack();
battery(battery_up, -20);
gopro(frame_length/2, 20);

x = arm_length/2*sin(angle/2);
y = arm_length/2*cos(angle/2);
z = 0;
motor_prop([x,y,z]);
motor_prop([x,-y,z]);
motor_prop([-x,y,z]);
motor_prop([-x,-y,z]);


module arm(rotation){
 rotate([0,0, rotation]) 
  translate([-arm_length/2, -arm_width/2, - arm_thickness]) 
    cube([arm_length, arm_width, arm_thickness]);
}

module plate(z) {
        translate([-frame_width/2,-frame_length/2,z]) 
           cube([frame_width, frame_length, plate_thickness]);    
};

module motor_prop(m) {
    translate(m)
      cylinder(12, d=25);
    
    translate([m[0],m[1],m[2]+12])
      cylinder(5, d=125);
    
};

module standoff(x,y,z) {
    translate([x,y,z])
     cylinder(h=frame_height, d=5);
};


module stack() {
    color("green")
    translate([-15,-15, 0])
    cube([30,30, frame_height-plate_thickness]);
};


module battery(up, y_shift) {
    color("#400000")
        
    translate([-battery_width/2,y_shift-battery_length/2, up ? (frame_height) : (-battery_height-arm_thickness-plate_thickness)])
    cube([battery_width, battery_length, battery_height]);
};


module gopro(y_offset, camera_angle) {
    color("#606060")
    
    translate([-30, y_offset-25, frame_height+plate_thickness])
     rotate([camera_angle, 0, 0])    
     cube([60,25,45]);
};

