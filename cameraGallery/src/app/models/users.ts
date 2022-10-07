export class User_authenticated {
   
    constructor(
        public access_token: string,
        public refresh_token: string,    
        
    ){}
}

export class User_data {
    constructor (
        public name: string,
        public email: string,
        public rol : string,
        public password: string,  

       
    ){}

}
