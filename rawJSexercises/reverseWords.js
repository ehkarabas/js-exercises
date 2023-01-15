// ("hello world!"                 ),  "world! hello")
// ("yoda doesn't speak like this" ),  "this like speak doesn't yoda")
// ("foobar"                       ),  "foobar")
// ("kata editor"                  ),  "editor kata")
// ("row row row your boat"        ),  "boat your row row row")
// (""                             ),  "")
function reverseWords(str) {
  return str
    .split(" ")
    .map((word) => word.split(""))
    .reverse()
    .map((letterArrRev) => letterArrRev.join(""))
    .join(" "); // reverse those words
}
