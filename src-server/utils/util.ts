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