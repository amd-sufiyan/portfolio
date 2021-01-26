let browserSync  = require("browser-sync").create();
let gulp         = require("gulp");
let sass         = require("gulp-sass");
let pug          = require("gulp-pug");
let babel        = require("gulp-babel");
let uglify       = require("gulp-uglify");
let concat       = require("gulp-concat");
let htmlInjector = require("bs-html-injector");

// let path = {
// 	sass: {
// 		input: "",
// 		output: "",

// 	},
// };

function browser_sync(){
	browserSync.use(htmlInjector, {
		files: "*.html"
	});
	browserSync.init({
		server: {
			baseDir: ".", 
		}, 
		browser: ["msedge"], 
		online: false, 
		port: 7000, 
		injectChanges: true, 
		ui: false
	});
}
function browserSyncPug(){
	browserSync.use(htmlInjector, {
		files: "*.html", 
		restrictions: ['section', '#footer'], 
		excludedTags: ["body"]
	});
	browserSync.init({
		server: {
			baseDir: ".", 
			index: "index.html", 
		}, 
		browser: ["msedge"], 
		online: false, 
		port: 7000, 
		injectChanges: true, 
		ui: false
	});
}

function styleSass(){
	return gulp.src("__src__/_style_/style.scss")
					.pipe(sass())
					.pipe(gulp.dest("assets/css/"))
					.pipe(browserSync.stream());
}

function owlSass(){
	return gulp.src("__src__/owl-scss/owl.theme.default.scss")
					.pipe(sass())
					.pipe(gulp.dest("assets/css/"))
					.pipe(browserSync.stream());
}

function javaScript(){
	return gulp.src("__src__/_js_/main.js")
					.pipe(babel({
						presets: ["@babel/preset-env"]
					}))
					.pipe(uglify())
					.pipe(concat('main.min.js'))
					.pipe(gulp.dest("assets/js/"))
					.pipe(browserSync.stream());
}

function pugHtml(){
	return gulp.src("__src__/_pug_/*.pug")
					.pipe(pug({"pretty": true}))
					.pipe(gulp.dest("./"))
					.pipe(browserSync.stream());

}

function _bootstrap(){
	return gulp.src("__src__/bootstrap/scss/bootstrap.scss")
					.pipe(sass())
					.pipe(gulp.dest("assets/css/"))
					.pipe(browserSync.stream());
}

function watchPug(){
	gulp.watch("__src__/_pug_/", pugHtml);
	gulp.watch("./__src__/_js_/", javaScript);
	gulp.watch("./__src__/_style_/", styleSass);
	gulp.watch("./__src__/owl-scss/", owlSass);
	gulp.watch("./__src__/bootstrap/scss/", _bootstrap);
}

function watchFiles(){
	gulp.watch("./__src__/_js_/", javaScript);
	gulp.watch("./__src__/_style_/", styleSass);
	gulp.watch("./__src__/owl-scss/", owlSass);
	gulp.watch("./__src__/bootstrap/scss/", _bootstrap);
	// gulp.watch("./__src__/_pug_/", pugHtml)
	// gulp.watch("*.html", browserSync.reload)
}

gulp.task("generateFiles", function(){
	let modules = "f:/App/npm/node_modules/";
	gulp.src(`${modules}jquery/dist/jquery.min.js`).pipe(gulp.dest("assets/js/"));
	// gulp.src("f:/App/npm/node_modules/bootstrap/scss/**/*").pipe(gulp.dest("__src__/bootstrap/scss/"));
	// gulp.src("siap").pipe(gulp.dest(gulp.dest("__scr__/Jaran Goyang/kdk.js")));
});



let watch = gulp.parallel(browser_sync, watchFiles)
let wpug = gulp.parallel(browserSyncPug, watchPug);

gulp.task("watch", watch)
gulp.task("wpug", wpug)
gulp.task("default", wpug)