export class BaseError extends Error {
    constructor(statusCode: number, message: string) {
      super(message);
    }
  }

export class InvalidName extends BaseError{
  constructor(){
    super(400, "Nome inválido")
  }
}

export class InvalidEmail extends BaseError{ 
  constructor(){
      super(400, "Email inválido")
  }
}

export class InvalidPassword extends BaseError{ 
  constructor(){
      super(400, "Senha inválida")
  }
}

export class UserNotFound extends BaseError{ 
  constructor(){
      super(404, "Usuário não encontrado")
  }
}

export class Unauthorized extends BaseError{ 
  constructor(){
      super(401, "Usuário não autorizado")
  }
}