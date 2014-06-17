importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.javax.imageio);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

context.checkArgs(1, 3, "<block> <length> <direction>");
var sess = context.remember();
var block = argv[1];
var length = argv[2];
var origin = player.getBlockIn();

usage = "<block id> <length> <direction>\n";
usage = "Direction : \n";
usage = "• u means Up\n";
usage = "• d means Down\n";
usage = "• n means North\n";
usage = "• e means East\n";
usage = "• w means West\n";
usage = "• s means South\n";
usage = "• un means Up and North\n";
usage = "• ue means Up and East\n";
usage = "• uw means Up and West\n";
usage = "• us means Up and South\n";
usage = "• dn means Down and North\n";
usage = "• de means Down and East\n";
usage = "• dw means Down and West\n";
usage = "• ds means Down and South\n";

if (argv[3] == "u") {
	for (var y = 1; y <= length; ++y) {
		sess.setBlock(origin.add(0, y, 0), new BaseBlock(block));
	}
} else if (argv[3] == "d") {
	for (var y = 1; y <= length && origin.getY() - y > 0; ++y) {
		sess.setBlock(origin.subtract(0, y, 0), new BaseBlock(block));
	}
} else if (argv[3] == "s") {
	for (var z = 1; z <= length; ++z) {
        sess.setBlock(origin.add(0, 0, z), new BaseBlock(block));
	}
} else if (argv[3] == "n") {
	for (var z = 1; z <= length; ++z) {
		sess.setBlock(origin.subtract(0, 0, z), new BaseBlock(block));
	}
} else if (argv[3] == "e") {
	for (var x = 1; x <= length; ++x) {
		sess.setBlock(origin.add(x, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "w") {
	for (var x = 1; x <= length; ++x) {
		sess.setBlock(origin.subtract(x, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "ue") {
	for (var step = 1; step < length; ++step) {
		sess.setBlock(origin.add(0, step, 0).add(step, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "uw") {
	for (var step = 1; step < length; ++step) {
		sess.setBlock(origin.add(0, step, 0).subtract(step, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "us") {
	for (var step = 1; step < length; ++step) {
		sess.setBlock(origin.add(0, step, 0).add(0, 0, step), new BaseBlock(block));
	}
} else if (argv[3] == "un") {
	for (var step = 1; step < length; ++step) {
		sess.setBlock(origin.add(0, step, 0).subtract(0, 0, step), new BaseBlock(block));
	}
} else if (argv[3] == "de") {
	for (var step = 1; step < length && origin.getY() - step > 0; ++step) {
		sess.setBlock(origin.subtract(0, step, 0).add(step, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "dw") {
	for (var step = 1; step < length && origin.getY() - step > 0; ++step) {
		sess.setBlock(origin.subtract(0, step, 0).subtract(step, 0, 0), new BaseBlock(block));
	}
} else if (argv[3] == "ds") {
	for (var step = 1; step < length && origin.getY() - step > 0; ++step) {
		sess.setBlock(origin.subtract(0, step, 0).add(0, 0, step), new BaseBlock(block));
	}
} else if (argv[3] == "dn") {
	for (var step = 1; step < length && origin.getY() - step > 0; ++step) {
		sess.setBlock(origin.subtract(0, step, 0).subtract(0, 0, step), new BaseBlock(block));
	}
} else {
	function lineDirection(block, length, iter) {
		for (var step = 1; step <= length; ++step) {
			sess.setBlock(iter(step), new BaseBlock(block));
		}
	}

	if (player.getCardinalDirection(0) == PlayerDirection.DOWN) {
		//player.print("Down");
		lineDirection(block, Math.min(origin.getY() - 1, length), function(step) {return origin.add(0, -step, 0);});
	} else if (player.getCardinalDirection(0) == PlayerDirection.UP) {
		//player.print("Up");
		lineDirection(block, length, function(step) {return origin.add(0, step, 0);});
	} else {
		var vertical;
		//player.print(player.getPitch())
		if (player.getPitch() < -45 && player.getPitch() > -135) {
			vertical = function (pos, step) {
				return pos.add(0, step, 0);
			}
		} else if(player.getPitch() > 45 && player.getPitch() < 135) {
			vertical = function (pos, step) {
				return pos.add(0, -step, 0);
			}
		} else {
			vertical = function (pos, step) {
				return pos.add(0, 0, 0);
			}
		}
		if (player.getCardinalDirection(0) == PlayerDirection.NORTH) {
			//player.print("North");
			lineDirection(block, length, function(step) {
				return vertical(origin.add(0, 0, -step), step);
			});
		} else if (player.getCardinalDirection(0) == PlayerDirection.SOUTH) {
			//player.print("South");
			lineDirection(block, length, function(step) {
				return vertical(origin.add(0, 0, step), step);
			});
		} else if (player.getCardinalDirection(0) == PlayerDirection.EAST) {
			//player.print("East");
			lineDirection(block, length, function(step) {
				return vertical(origin.add(step, 0, 0), step);
			});
		} else if (player.getCardinalDirection(0) == PlayerDirection.WEST) {
			//player.print("West");
			lineDirection(block, length, function(step) {
				return vertical(origin.add(-step, 0, 0), step);
			});
		}
	}
}

