/**
 * InvertedIndex class
 */
  class InvertedIndex {
 /**
  * constructor - contain class properties
  */
    constructor() {
      this.allIndices = {};
      this.fileContent = {};
    }
  /**
    * createIndex - creates index for json files
    * @param  {string} fileName : string
    * @param  {object} fileContent :array of object
    * @return {object} returns : object
    */
    createIndex(fileName, fileContent) {
      const indices = {};
      if (!this.emptyArray(fileContent) &&
      (!this.invalidFile(fileContent)) &&
      this.malformedFile(fileContent) === false) {
        fileContent.forEach((element, index) => {
          const allText = element.text;
          const bookToken = this.getToken(allText);
          bookToken.forEach((token) => {
            if (token in indices) {
              indices[token].push(index);
            } else if (token === '') {
              token = '';
            } else {
              indices[token] = [index];
            }
          });
        });
      } else {
        return 'Invalid File Content';
      }
      this.allIndices[fileName] = indices;
      return this.allIndices;
    }
  /**
    * getToken -  replaces non-alphanemeric characters with a space
    * also splits text by spaces
    * @param  {string} text takes in text in form of string
    * @return {object}   returns an array
    */
    getToken(text) {
      this.fileContent = text;
      text = text.replace(/[^A-Za-z0-9]/g, ' ');
      return text.toLowerCase()
      .split(/\s+/);
    }
 /**
  * invalidFile - checks for invalid json file
  * @param  {object} fileContent takes in an object
  * @return {boolean}   returns an error message
  */
    invalidFile(fileContent) {
      this.fileContent = fileContent;
      let status = false;
      if (!Array.isArray(fileContent)) {
        status = true;
      }
      return status;
    }
 /**
  * malfomedFile - checks for invalid json file
  * @param  {object} fileContent takes in an object
  * @return {boolean}   returns an error message
  */
    malformedFile(fileContent) {
      this.fileContent = fileContent;
      const getNonObject = [];
      fileContent.forEach((content) => {
        if (content.title === undefined ||
         content.text === undefined) {
          getNonObject.push('error');
        }
      });
      if (getNonObject.length > 0) {
        return true;
      }
      return false;
    } /**
  * emptyArray - checks for empty json file
  * @param  {object} fileContent takes in an object
  * @return {boolean}  return boolean(true)
  */
    emptyArray(fileContent) {
      this.fileContent = fileContent;
      if (fileContent.length === 0) {
        return true;
      }
      return false;
    }
  /**
   *  searchIndex - searches for the index of the valid json file created
   * @param  {Object} index : created index
   * @param  {string} fileName : name of file containing the search term
   * @param  {string} terms: rest operator
   * @return {array}  description return an array
   **/
    searchIndex(index, fileName, ...terms) {
      this.fileContent = fileName;
      const searchResult = {};
      fileName = Object.keys(index)[0];
      const eachKeys = Object.keys(index[fileName]);
      for (let i = 0; i < terms.length; i += 1) {
        let splitTerms = terms[i].toLowerCase();
        splitTerms = splitTerms.split(/[\s]/g);
        for (let j = 0; j < splitTerms.length; j += 1) {
          for (let indexes = 0; indexes < eachKeys.length; indexes += 1) {
            if (!(splitTerms[j] in index[fileName])) {
              Object.assign(searchResult, { [splitTerms[j]]: 'Not found!' });
            }
            if (splitTerms[j] === eachKeys[indexes]) {
              Object.assign(searchResult, { [splitTerms[j]]: index[fileName][eachKeys[indexes]] });
            }
          }
        }
      }
      return searchResult;
    }
  }

  export default InvertedIndex;
