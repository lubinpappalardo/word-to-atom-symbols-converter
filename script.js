// list of elements
var elementsSymbols = [
    "H",                                                                                                "He", 
    "Li", "Be",                                                                "B", "C", "N", "O", "F", "Ne", 
    "Na", "Mg",                                                             "Al", "Si", "P", "S", "Cl", "Ar", 
    "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", 
    "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", 
    "Cs", "Ba",      "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra",     "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
                    "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", 
                    "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr" 
 ];
 
 // list of full names of the elements
var elementsFullNames = [
    "Hydrogen",                                                                                                                         "Helium", 
    "Lithium", "Beryllium",                                                         "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", 
    "Sodium", "Magnesium",                                                  "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", 
    "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", 
    "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", 
    "Cesium", "Barium",             "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon",
    "Francium", "Radium",           "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tennessine", "Oganesson",
                                    "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium",
                                    "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium"
 ];

//  console.log(elementsSymbols.length);
//  console.log(elementsFullNames.length);
//  for (var i = 0; i < elementsFullNames.length; i++) {
//      console.log(elementsSymbols[i] + " " + elementsFullNames[i]);
//  }

 document.getElementById("inputWord").addEventListener("keyup", function(event) {
     translateWord();
 })


 function translateWord() {
    var inputWord = document.getElementById("inputWord").value;
 
    if (inputWord.split(" ").length > 1) {
        document.getElementById("result").innerHTML = "Please enter only one word";
        return;
    }
 
    var splitWord = Array.from(inputWord);
    var pointer = 0;
    var lastMove = 0;
    var result = [];
    var isLastTry = false;
    var limit = 0;
 
    function translate(quantity) {
        if (limit >= 100) {
            document.getElementById("result").innerHTML = "Limit reached";
            return "Limit reached";
        }
        limit += 1;
 
        if (quantity == 2) {
            var characterS = splitWord[pointer].toUpperCase() + splitWord[pointer + 1].toLowerCase();
 
            if (elementsSymbols.includes(characterS)) {
                result.push(characterS);
 
                if (pointer + 3 < splitWord.length) {
                   pointer += 2;
                   lastMove = 2;
                   isLastTry = false;
                   translate(2);
                }
                else if (pointer + 2 < splitWord.length) {
                   if (lastMove == 1) {
                       pointer += 1;
                   } else {
                       pointer += 2;
                   }
                   lastMove = 1;
                   isLastTry = false;
                   translate(1);
                } else {
                    document.getElementById("result").innerHTML = "Translated word: " + result.join(" ") + "<br>";
                    for (var i = 0; i < result.length; i++) {
                        document.getElementById("result").innerHTML += elementsFullNames[elementsSymbols.indexOf(result[i])] + "<br>";
                    }
                    return;
                }
            } else {
                translate(1);
            }
        }
        else if (quantity == 1) {
            var characterS = splitWord[pointer].toUpperCase();
 
            if (elementsSymbols.includes(characterS)) {
                if (isLastTry) {
                   result.pop();
                }
                result.push(characterS);
 
                if (pointer + 2 < splitWord.length) {
                   pointer += 1;
                   lastMove = 1;
                   translate(2);
                }
                else if (pointer + 1 < splitWord.length) {
                   pointer += 1;
                   lastMove = 1;
                   translate(1);
                } else {
                    document.getElementById("result").innerHTML = "Translated word: " + result.join(" ") + "<br>";
                    for (var i = 0; i < result.length; i++) {
                       document.getElementById("result").innerHTML += elementsFullNames[elementsSymbols.indexOf(result[i])] + "<br>";
                    }
                   return;
                }
            } else if (isLastTry) {
                document.getElementById("result").innerHTML = "This word can't be translated: " + result.join(" ");
                return;
            } else {
                if (pointer - 1 < 0) {
                   document.getElementById("result").innerHTML = "This word can't be translated: " + result.join(" ");
                   return;
                } else {
                   isLastTry = true;
                   pointer -= 2;
                   lastMove = 2;
                   translate(1);
                }
            }
        } else {
            return "Error: quantity not specified";
        }
    }
 
    if (splitWord.length == 1) {
        translate(1);
    } else {
        translate(2);
    }
 }
 