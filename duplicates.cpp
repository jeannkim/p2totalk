#include <iostream>
#include <fstream>
#include <string>
using namespace std;

/**
 * For any given pronunciation, there can be multiple corresponding words
 * (this is the case in the cmudict)
 * This method chooses the best word to correspond to the pronunciation
 * @param pronun the phonemic representation of a pronunciation
 * @return the best corresponding word for that pronunciation
*/
string chooseBestWord(string pronun){
    
}

int main(){
   fstream newfile;



   newfile.open("cleandict.txt",ios::in); //open a file to perform read operation using file object
   if (newfile.is_open()){ //checking whether the file is open
      string line;
      while(getline(newfile, line)){ //read data from file object and put it into string.
        
         // need to read the data in the file into a data structure where
         // key: pronunciation
         // value: all words corresponding to that pronunciation


      }
      newfile.close(); //close the file object.
   }

    // run chooseBestWord on all KEYS
    // write the output of chooseBestWord (with correct formatting) into a new text file
    // this text file will be the FINAL dictionary text file
}