
export interface CreateUserResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    transactions: Array<any>
}
/*
* {
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "userName": "Jeff Bezos",
  "email": "jeff.bezos@amazon.com.br",
  "password": "Jeff@123",
  "createdAt": "2024-06-14T23:12:10.011Z",
  "transactions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "description": "Grocery",
      "type": "DEBIT",
      "amount": 123.45,
      "status": "DONE",
      "registeredAt": "2024-06-14T23:12:10.011Z",
      "createdAt": "2024-06-14T23:12:10.011Z",
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
* */