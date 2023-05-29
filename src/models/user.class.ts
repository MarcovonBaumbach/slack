export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public telephone: number;
    public ID: number;                     // user ID
    public img: any;                       // img file or path to img
    public title: string;                  // title or extra detail of person
    public status: string;                 // Active, AFK, Log out
    public statusTime: number;             // Active since <data>
    public channels: Array<any>;           // Channels connected to the user
    public contacts: Array<any>;           // Contacts connected to the user
    public searchHistory: Array<any>;      // Search history

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.email : '';
        this.telephone = obj ? obj.telephone : '';
        this.ID = obj ? obj.ID : '';
        this.img = obj ? obj.img : '';;
        this.title = obj ? obj.title : '';;
        this.status = obj ? obj.status : '';;
        this.statusTime = obj ? obj.statusTime : '';
        this.channels = obj ? obj.channels : '';
        this.contacts = obj ? obj.contacts : '';
        this.searchHistory = obj ? obj.email : '';
    }


    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            telephone: this.telephone,
            ID: this.ID,
            img: this.img,
            title: this.title,
            status: this.status,
            statusTime: this.statusTime,
            channels: this.channels,
            contacts: this.contacts,
            searchHistory: this.searchHistory
        }
    }
}

