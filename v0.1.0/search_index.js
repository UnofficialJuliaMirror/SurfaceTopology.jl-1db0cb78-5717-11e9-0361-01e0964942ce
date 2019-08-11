var documenterSearchIndex = {"docs":
[{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"EditURL = \"@__REPO_ROOT_URL__/\"","category":"page"},{"location":"features/#Intorduction-1","page":"Intorduction","title":"Intorduction","text":"","category":"section"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"As we know triangular meshes can be stored in a computer in a multiple different ways, each having strength and weaknesses in a particular cases. Not always it is clear which datastructure would be most performant for a numerical algorithm so it is wise to write a datastructure generic code. This package is exactly for that purpose for orriented closed surfaces.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The simplest representation of triangular mesh topology is in array Array{Faces{3,Int},1} containing a list of triangular faces which are defined by their vertices. Often in a numerical code one wants not only to iterate over faces or vertices, but also in case of singularity substraction, integration and local property estimation like normal vectors and curvature to know what are neighbouring verticies surrounding a given vertex while keeping track of orrientation of the normals. Also one wishes to modify the topology itself by colloapsing, flipingn and splitting edges. This is why different datstructrures are needed for different problems.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"Fortunatelly it is possible to abstract queries of the topology through iterators:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"Faces(topology)\nEdges(topology)","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"and circulators:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"VertexRing(topology,v)\nEdgeRing(topology,v)","category":"page"},{"location":"features/#API-1","page":"Intorduction","title":"API","text":"","category":"section"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"At the moment the package implements three different kinds of datastructures. The simplest one is PlainDS one which stores list of faces and is just an alias to Array{Faces{3,Int},1}. As an example how taht works let's deffine the datastructure:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"using GeometryTypes\nusing SurfaceTopology\n\n@info \"Topology function tests\"\n\nfaces = Face{3,Int}[\n    [6,   8,  11],\n    [8,   6,   7],\n    [5,   1,   4],\n    [1,   5,   7],\n    [5,   8,   7],\n    [5,  10,  11],\n    [8,   5,  11],\n    [1,   3,   2],\n    [3,   1,   7],\n    [3,   6,   2],\n    [6,   3,   7],\n    [9,   5,   4],\n    [5,  12,  10],\n    [9,  12,   5],\n    [10,  12,   4],\n    [12,   9,   4]\n]","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The datastructure faces can be directly used for the queries. The iterators can be executed:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(Faces(faces))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"and","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(Edges(faces))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"giving us desirable output.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The circulators which for this simple datastructure requires to do a full lookup on the array can simply be executed as:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,faces))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"and","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(EdgeRing(3,faces))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"In practice one should use EdgeRing over VertexRing since in the later one vertices are not ordered.","category":"page"},{"location":"features/#Datastructures-1","page":"Intorduction","title":"Datastructures","text":"","category":"section"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The same API works for all other datastructures. There is a datastructure CachedDS built on top of PlainDS stores closest vertices (vertex ring). Then there is a datastructure FaceDS which with PlainDS also stores neighbouring faces which have a common edge. And then there are most popular datastructures HalfEdgeDS (implemented as EdgeDS).","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The simplest extension is just a plain caching implemented under CacheDS which for each vertex stores it's surrounding verticies.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"CacheDS","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"which can be initialised from PlainDS","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"cachedtopology = CacheDS(faces)","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"And the same API can be used for querries:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,cachedtopology))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"A more advanced datastructure is a face based datastructure which in this library is defined as FaceDS which additionally for each face stores 3 neigbouring face indicies.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"FaceDS","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"which again can be initialised from PlainDS","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"facedstopology = FaceDS(faces)","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"and what would one expect","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,facedstopology))","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"works.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"The last in the list is half edge datastructure EdgeDS which stores edges with three numbers - base vertex index, next edge index and twin edge index.","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"EdgeDS","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"To initiate this datastructure one executes:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"edgedstopology = EdgeDS(faces)","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,edgedstopology))","category":"page"},{"location":"features/#Wishlist-1","page":"Intorduction","title":"Wishlist","text":"","category":"section"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"At the moment the package is able to only answer queries, but it would be desirable to also be able to do topological operations. For completition thoose would include:","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"edgeflip(topology,edge)\nedgesplit(topology,edge)\nedgecollapse(topology,edge)","category":"page"},{"location":"features/#","page":"Intorduction","title":"Intorduction","text":"And with them also a method for defragmenting the topology. Unfortunatelly due to irrelevance of this package for my present research, the development of that on my own will be slow. I hope that clarity and simplicity of this package could serve someone as a first step and so eventually topological operations would be impemented out of necessity.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"EditURL = \"https://github.com/akels/SurfaceTopology.jl/blob/master/examples/features.jl\"","category":"page"},{"location":"#Intorduction-1","page":"Intorduction","title":"Intorduction","text":"","category":"section"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"As we know triangular meshes can be stored in a computer in a multiple different ways, each having strength and weaknesses in a particular cases. Not always it is clear which datastructure would be most performant for a numerical algorithm so it is wise to write a datastructure generic code. This package is exactly for that purpose for orriented closed surfaces.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The simplest representation of triangular mesh topology is in array Array{Faces{3,Int},1} containing a list of triangular faces which are defined by their vertices. Often in a numerical code one wants not only to iterate over faces or vertices, but also in case of singularity substraction, integration and local property estimation like normal vectors and curvature to know what are neighbouring verticies surrounding a given vertex while keeping track of orrientation of the normals. Also one wishes to modify the topology itself by colloapsing, flipingn and splitting edges. This is why different datstructrures are needed for different problems.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"Fortunatelly it is possible to abstract queries of the topology through iterators:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"Faces(topology)\nEdges(topology)","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"and circulators:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"VertexRing(topology,v)\nEdgeRing(topology,v)","category":"page"},{"location":"#API-1","page":"Intorduction","title":"API","text":"","category":"section"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"At the moment the package implements three different kinds of datastructures. The simplest one is PlainDS one which stores list of faces and is just an alias to Array{Faces{3,Int},1}. As an example how taht works let's deffine the datastructure:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"using GeometryTypes\nusing SurfaceTopology\n\nfaces = Face{3,Int64}[\n    [1, 12, 6], [1, 6, 2], [1, 2, 8], [1, 8, 11], [1, 11, 12], [2, 6, 10], [6, 12, 5],\n    [12, 11, 3], [11, 8, 7], [8, 2, 9], [4, 10, 5], [4, 5, 3], [4, 3, 7], [4, 7, 9],\n    [4, 9, 10], [5, 10, 6], [3, 5, 12], [7, 3, 11], [9, 7, 8], [10, 9, 2]\n]","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The datastructure faces can be directly used for the queries. The iterators can be executed:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(Faces(faces))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"and","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(Edges(faces))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"giving us desirable output.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The circulators which for this simple datastructure requires to do a full lookup on the array can simply be executed as:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,faces))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"and","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(EdgeRing(3,faces))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"In practice one should use EdgeRing over VertexRing since in the later one vertices are not ordered.","category":"page"},{"location":"#Datastructures-1","page":"Intorduction","title":"Datastructures","text":"","category":"section"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The same API works for all other datastructures. There is a datastructure CachedDS built on top of PlainDS stores closest vertices (vertex ring). Then there is a datastructure FaceDS which with PlainDS also stores neighbouring faces which have a common edge. And then there are most popular datastructures HalfEdgeDS (implemented as EdgeDS).","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The simplest extension is just a plain caching implemented under CacheDS which for each vertex stores it's surrounding verticies.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"CachedDS","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"which can be initialised from PlainDS","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"cachedtopology = CachedDS(faces)","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"And the same API can be used for querries:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,cachedtopology))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"A more advanced datastructure is a face based datastructure which in this library is defined as FaceDS which additionally for each face stores 3 neigbouring face indicies.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"FaceDS","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"which again can be initialised from PlainDS","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"facedstopology = FaceDS(faces)","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"and what would one expect","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,facedstopology))","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"works.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"The last in the list is half edge datastructure EdgeDS which stores edges with three numbers - base vertex index, next edge index and twin edge index.","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"EdgeDS","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"To initiate this datastructure one executes:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"edgedstopology = EdgeDS(faces)","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"collect(VertexRing(3,edgedstopology))","category":"page"},{"location":"#Wishlist-1","page":"Intorduction","title":"Wishlist","text":"","category":"section"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"At the moment the package is able to only answer queries, but it would be desirable to also be able to do topological operations. For completition thoose would include:","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"edgeflip(topology,edge)\nedgesplit(topology,edge)\nedgecollapse(topology,edge)","category":"page"},{"location":"#","page":"Intorduction","title":"Intorduction","text":"And with them also a method for defragmenting the topology. Unfortunatelly due to irrelevance of this package for my present research, the development of that on my own will be slow. I hope that clarity and simplicity of this package could serve someone as a first step and so eventually topological operations would be impemented out of necessity.","category":"page"}]
}
