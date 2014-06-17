importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.javax.imageio);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

context.checkArgs(1, 5, "<block> <length> <weight> <height> <step>");
var sess = context.remember();
var block = argv[1];
var length = argv[2];
var weight = argv[3];
var height = argv[4];
var step = argv[5];
var origin = player.getBlockIn();

for (var i = 0; i < length; ++i) {
	for (var j = 0; j < weight; ++j) {
		for (var k = 0; k < height; ++k) {
			sess.setBlock(origin.add(parseInt(i * step), parseInt(j * step), parseInt(k * step)), new BaseBlock(block));
		}
	}
}