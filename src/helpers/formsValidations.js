type Validator = (value: any) => boolean;;

type Rule = {
  validator: Validator;
  errorMessage: string;
};

export const isNumber: Validator = (value: any) => {
  return /^\d+$/.test(value);
}

export const isEmail: Validator = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

export const isRequired: Validator = (value: any) => {
  return value ? true : false
}


// export const validate = (value, [isNumber?: boolean, isEmail?: boolean, isRequire?: boolean]) => {
//   if(isNumber){
//     return
//   }
// }

export const validate = (value: any, rules: Rule[]) => {
  for (let i = 0; i < rules.length; i++) {
    if (!rules[i].validator(value)) {
      return rules[i].errorMessage;
    }
  }

  return null;
}
