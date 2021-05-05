
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

color_carbon = "#404040";
//g/cm3
carbon_density = 2;
standoff_density = 2.7;
//g
stack_weight = 18;
battery_weight = 180;
gopro_weight = 116;
motor_weight = 33.3;
prop_weight = 20;

plate(0);
plate(frame_height);
plate(-arm_thickness-plate_thickness);  

arm(90-angle/2);
arm(90+angle/2);

//$fn = 12;

x_standoff = frame_width/2-standoff_offset;
y_standoff = frame_length/2-standoff_offset;

standoff(x_standoff, y_standoff, 0);
standoff(x_standoff, -y_standoff, 0);
standoff(-x_standoff, -y_standoff, 0);
standoff(-x_standoff, y_standoff, 0);



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
 color(color_carbon, name="carbon", density=carbon_density) 
 rotate([0,0, rotation]) 
  translate([-arm_length/2, -arm_width/2, - arm_thickness]) 
    cube([arm_length, arm_width, arm_thickness]);
}

module plate(z) {
    color(color_carbon, name="carbon", density=carbon_density) 
        translate([-frame_width/2,-frame_length/2,z]) 
           cube([frame_width, frame_length, plate_thickness]);    
};

module motor_prop(m) {
    color("#203040", name="motor", weight=motor_weight)
    translate([m[0],m[1],m[2]+2])
      cylinder(12, d=25);
    
    # color("#F0F0F0", name="prop", weight=prop_weight)
    translate([m[0],m[1],m[2]+16])
      cylinder(5, d=125);
    
};

module standoff(x,y,z) {
    color("#00C0C0", name="standoff", density=standoff_density) 
    translate([x,y,z])
     cylinder(h=frame_height, d=5);
};


module stack() {
    color("#006000", name="stack", weight=stack_weight)
    translate([-15,-15, 0])
    cube([30,30, frame_height-plate_thickness]);
};


module battery(up, y_shift) {
    color("#400000", name="battery", weight=battery_weight)
        
    translate([-battery_width/2,y_shift-battery_length/2, up ? (frame_height) : (-battery_height-arm_thickness-plate_thickness)])
    cube([battery_width, battery_length, battery_height]);
};


module gopro(y_offset, camera_angle) {
    color("#606060", name="gopro", weight=gopro_weight)
    
    translate([-30, y_offset-25, frame_height+plate_thickness])
     rotate([camera_angle, 0, 0])    
     cube([60,25,45]);
};

