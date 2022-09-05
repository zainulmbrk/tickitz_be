const useError = (errCode)=> {
    if(errCode === "ER_DUP_ENTRY") {
      return { message: "Email Already Use" }
    }
}
const useSuccess = (results)=> {
    if(results === "ER_DUP_ENTRY") {
      return { message: "Email Already Use" }
    }
    if(results === "ER_DUP_ENTRY") {
      return { message: "Email Already Use" }
    }
    if(results === "ER_DUP_ENTRY") {
      return { message: "Email Already Use" }
    }
    
}

module.exports = {
    useError,
    useSuccess
}

