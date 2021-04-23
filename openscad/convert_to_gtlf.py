# %%
import numpy as np
import trimesh
import pyglet
#import matplotlib.pyplot as plt

# attach to logger so trimesh messages will be printed to console
#trimesh.util.attach_to_log()

# %%
mesh = trimesh.load('quad_model.off')

# %%
# is the current mesh watertight?
print(mesh.__class__)

print(mesh.is_watertight)

# what's the euler number for the mesh?
print(mesh.euler_number)


print(mesh.volume)

print(mesh.volume / mesh.convex_hull.volume)

print(mesh.moment_inertia)
print(mesh.principal_inertia_components)
print(mesh.principal_inertia_vectors)

#%% 
mesh.vertices -= mesh.center_mass
mesh.vertices *= 0.05
#mesh.rotate()

print(mesh.moment_inertia)
print(mesh.principal_inertia_components)
print(mesh.principal_inertia_vectors)

for facet in mesh.facets:
    mesh.visual.face_colors[facet] = [192, 128, 192, 0]

# %%
with open("quad_model.glb", 'wb') as f:
    f.write(trimesh.exchange.gltf.export_glb(mesh))
    #, include_normals=True

with open("quad_model_export.stl", 'wb') as f:
    f.write(trimesh.exchange.stl.export_stl(mesh))
    #, include_normals=True

# %%
#mesh.show()