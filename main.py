
# list of elements
elements_symbols = [
    "H",                                                                                                "He", 
    "Li", "Be",                                                                "B", "C", "N", "O", "F", "Ne", 
    "Na", "Mg",                                                             "Al", "Si", "P", "S", "Cl", "Ar", 
    "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", 
    "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", 
    "Cs", "Ba",      "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra",     "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
                    "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", 
                    "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr" 
]


# word to be converted
input_word = str(input("Enter a word: "))

# make sure it's one word
if len(input_word.split()) > 1:
    print("Please enter only one word")
    exit()

# split the word
split_word = [*input_word]
#print(split_word)




pointer = 0
last_move = 0
result = []
is_last_try = False
limit = 0

def translate(quantity):
    global pointer, last_move, result, is_last_try, limit

    # if the limit is reached
    if limit >= 100:
        print("Limit reached")
        return "Limit reached"
    limit += 1

    #print(f'{pointer} / {len(split_word)} ({(len(split_word) - 1)})   - {split_word[pointer]}')

    # take 2 items of list or 1 item of list
    if quantity == 2:
        character_s = split_word[pointer].upper() + split_word[pointer + 1].lower()
        

        if character_s in elements_symbols:

            #print(character_s, ' - yes')

            result.append(character_s)
            #print("Word: ", " ".join(result))

            # if their is two characters left
            if pointer + 3 < len(split_word):
                pointer += 2
                last_move = 2
                is_last_try = False
                #print("Q2: Translating next 2 characters")
                translate(2)

            # if their is one character left
            elif pointer + 2 < len(split_word):
                if last_move == 1:
                    pointer += 1
                else:
                    pointer += 2
                last_move = 1
                is_last_try = False
                #print("Q2: Translating next characters")
                translate(1)
            
            # if their is not more character left the translation is done
            else:
                print("Translated word: ", " ".join(result))
                return
        
        # if the 2 characters are not an element, try the first character
        else:
            #print(character_s, ' - no')
            translate(1)
            


    elif quantity == 1: 

        character_s = split_word[pointer].upper()

        if character_s in elements_symbols:

            #print(character_s, ' - yes')

            if is_last_try:
                # remove last item from result list
                result.pop()
                #print("Pop last item: ", " ".join(result))

            result.append(character_s)
            #print("Word: ", " ".join(result))

            # if their is two or more characters left
            if pointer + 2 < len(split_word):
                pointer += 1
                last_move = 1
                #print("Q1: Translating 2 characters")
                translate(2)

            # if their is one character left
            elif pointer + 1 < len(split_word):
                pointer += 1
                last_move = 1
                #print("Q1: Translating next characters")
                translate(1)
            
            # if their is not more character left the translation is done
            else:
                print("Translated word: ", " ".join(result))
                return



        elif is_last_try:
            print("This word can't be translated: ", " ".join(result))
            return

        # if their's still not characters
        else:

            #print(character_s, ' - no')
            # go back to previous character if their is one and delete the previous added symbol
            if pointer - 1 < 0:
                print("This word can't be translated: ", " ".join(result))
                return
            else: 
                is_last_try = True

                pointer -= 2
                last_move = 2

                translate(1)


    else:
        return "Error: quantity not specified"
                
     

                
                





if len(split_word) == 1:
    translate(1)
else:
    translate(2)
    