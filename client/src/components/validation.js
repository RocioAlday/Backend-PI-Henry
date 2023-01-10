export function validation(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[\s\S]{3,20}$/.test(input.name)) {
      errors.name = 'Name requires 3 - 20 characters';
    }
    
    if(!input.description){
      errors.description = "Description is required";
    } else if(!/^[\s\S]{10,500}$/.test(input.description)) { //entre 10-500 caracteres
      errors.description = "Description is invalid, required 10 to 500 characters";
    }

    if(!input.dateOfRelease){
        errors.dateOfRelease = "Date of release is required";
      } else if(!/^[1-2][089]\d{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(input.dateOfRelease)) {  //dd/mm/aaaa 
        errors.dateOfRelease = "Date is invalid, format required: dd/mm/aaaa";
    }

    if(input.platforms.length < 1){
        errors.platforms = "Platform is required , choose 1 platform al least";
    }

    if(input.genres.length < 1){
        errors.id_genre = "Genre is required, choose 1 genre al least";
    }

    if(!input.image){
        errors.image = "URL is required";
      } else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input.image)) {
        errors.image = "URL is invalid";
    }

    if(input.formError){
        errors.formError = 'Fill in the required fields...'
    }
  
    return errors;
};