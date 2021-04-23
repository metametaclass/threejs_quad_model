radius = 20; 
thickness = 2;

rotate([0,90,0])
 scale([1,0.5,1])
  union(){
      difference() {
        cylinder(thickness, radius, radius, true);
        cylinder(3, radius-thickness, radius-thickness, true);
      }
      //translate([-radius,-1,-1])
        //cube([radius*2, thickness, thickness]);
    translate([-1,-radius,-1])
      cube([thickness, radius*2, thickness]);
  }
 
rotate([0,90,0])
 translate([0,0,-1])
  cylinder(20, 2, 2);