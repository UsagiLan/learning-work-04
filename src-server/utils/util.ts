import { validate } from "class-validator";

export async function tryCatchDetect(func) {
  let result = null;
  try{
    result = await func();
    return {
      code: 0,
      message: "success",
      data: result
    }
  } catch(e) {
    return {
      code: 1,
      message: e.message,
      data: JSON.stringify(e)
    }
  }
  
}

export async function validateParams(dto, body) {
  let valid = new dto();
  Object.keys(body).forEach(key => {
    valid[key] = body[key]
  });
  console.log(body)
  return validate(valid).then(errors => {
    let errorMsg = '';
    errors.forEach(e => {
      errorMsg += `${Object.values(e.constraints).join(';')}`
    });
    if (errorMsg) throw new Error(errorMsg);
    return errorMsg;
  })
}