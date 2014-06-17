importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.javax.imageio);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

context.checkArgs(1, 3, "<block> <length>");
var sess = context.remember();
var block = argv[1];
var length = argv[2];
var origin = player.getBlockIn();

var vertex_array = [];

for (var x = -1; x < 2; ++x) {
	for (var y = -1; y < 2; ++y) {
		for (var z = -1; z < 2; ++z) {
			var tmp = {};
			tmp["x"] = parseInt(x * length);
			tmp["y"] = parseInt(y * length);
			tmp["z"] = parseInt(z * length);
			//vertex_array.push({"x" : parseInt(x * length), "y" : parseInt(y * length), "z" : parseInt(z * length)});
			vertex_array.push(tmp);
			//player.print(tmp["x"]);
			sess.setBlock(origin.add(parseInt(x * length), parseInt(y * length), parseInt(z * length)), new BaseBlock(block));
		}
	}
}

function inSameLine(pointA, pointB) {
	var difference_x = Math.abs(pointA["x"] - pointB["x"]);
	var difference_y = Math.abs(pointA["y"] - pointB["y"]);
	var difference_z = Math.abs(pointA["z"] - pointB["z"]);

	if (difference_x == difference_y && difference_x == difference_z) {
		return true;
	}
	if (Math.abs(difference_x - difference_y) + difference_z == 0 ||
		Math.abs(difference_x - difference_z) + difference_y == 0 ||
		Math.abs(difference_y - difference_z) + difference_x == 0) {
		return true;
	}
	if (difference_x + difference_y == 0 ||
		difference_x + difference_z == 0 ||
		difference_y + difference_z == 0) {
		return true;
	}

	return false;
}

function connectLine(pointA, pointB) {
	var line = [];
	var steps = [];
	//var length = 0;

	var key_list = ["x", "y", "z"];
	for (var i in key_list) {
		key = key_list[i];
		//player.print(key + " : " + pointA[key]);
		//length = Math.max(Math.abs(pointA[key] - pointB[key]), length);
		if ((pointA[key] - pointB[key]) == 0) {
			steps.push(0);
		} else if ((pointA[key] - pointB[key]) > 0) {
			steps.push(1);
		} else {
			steps.push(-1);
		}
	}

	//player.print(length);
	for (var i = 1; i < length; ++i) {
		var tmp = {};
		tmp["x"] = steps[0] * i + pointB["x"];
		tmp["y"] = steps[1] * i + pointB["y"];
		tmp["z"] = steps[2] * i + pointB["z"];
		line.push(tmp);
		//player.print(tmp["x"]);
		//line.push([steps[0] * length, steps[1] * length, steps[2] * length]);
	}

	return line;
}

//for (var i = 0; i < vertex_array.length; ++i) {
//	player.print(vertex_array[i]["x"] + " " + vertex_array[i]["y"] + " " + vertex_array[i]["z"])
//}
for (var i = 0; i < vertex_array.length; ++i) {
	for (var j = i + 1; j < vertex_array.length; ++j) {
		if (inSameLine(vertex_array[i], vertex_array[j])) {
			//player.print(vertex_array[i]["x"])
			var line = connectLine(vertex_array[i], vertex_array[j]);
			//player.print(line.length)
			for (var m in line) {
				var point = line[m];
				//player.print(point["x"] + ", " + point["y"] + ", " + point["z"])
				/*if (point["y"] < 0) {
					player.print(parseInt(point["x"]) + ", " + parseInt(point["y"]) + ", " + parseInt(point["z"]));
				}*/
				sess.setBlock(origin.add(parseInt(point["x"]), parseInt(point["y"]), parseInt(point["z"])), new BaseBlock(block));
			}
		}
	}
}