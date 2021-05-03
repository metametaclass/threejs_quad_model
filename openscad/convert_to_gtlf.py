# %%
import sys
import os
import numpy as np
import trimesh
import pyglet
#import matplotlib.pyplot as plt

# attach to logger so trimesh messages will be printed to console
#trimesh.util.attach_to_log()

# %%
mesh = trimesh.load(sys.argv[1])

# %%
# is the current mesh watertight?
print(mesh.__class__)

print(mesh.is_watertight)

# what's the euler number for the mesh?
print(mesh.euler_number)


print(mesh.volume)

print(mesh.volume / mesh.convex_hull.volume)


print("moment_inertia", mesh.moment_inertia)
print("principal_inertia_components", mesh.principal_inertia_components)
print("principal_inertia_vectors", mesh.principal_inertia_vectors)

#%% 
mesh.vertices -= mesh.center_mass
#mesh.vertices *= 0.05


#rotate mode to NED axis
origin, xaxis, yaxis, zaxis = [0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]

#qx = trimesh.transformations.quaternion_about_axis(alpha, xaxis)
qy = trimesh.transformations.quaternion_about_axis(np.pi, yaxis)
qz = trimesh.transformations.quaternion_about_axis(np.pi/2, zaxis)
q = trimesh.transformations.quaternion_multiply(qy, qz)

t = trimesh.transformations.quaternion_matrix(q)

mesh.apply_transform(t)

print("after transform:")
print(mesh.moment_inertia)
print(mesh.principal_inertia_components)
print(mesh.principal_inertia_vectors)

for facet in mesh.facets:
    #print(facet)
    mesh.visual.face_colors[facet] = [192, 128, 192, 0]

# %%
name_prefix,ext = os.path.splitext(sys.argv[1])
#name_prefix = os.path.basename(name_prefix)


with open(name_prefix+".glb", 'wb') as f:
    f.write(trimesh.exchange.gltf.export_glb(mesh, include_normals=True))
    #, include_normals=True

# export gltf files
for k,v in trimesh.exchange.gltf.export_gltf(mesh, include_normals=True).items():
    with open(name_prefix+"_"+k, 'wb') as f:
        f.write(v)
    #, include_normals=True

with open(name_prefix+".stl", 'wb') as f:
    f.write(trimesh.exchange.stl.export_stl(mesh))
    #, include_normals=True

trimesh.exchange.export.export_mesh(mesh, name_prefix+"_mesh.json")
# with open(name_prefix+".stl", 'wb') as f:
#     f.write()

# %%
#mesh.show()
