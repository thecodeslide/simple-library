(function(global, $) {

    const Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };

    const supportedLangs = ['en', 'es', 'pt'];

    const greetings = {
        en: 'Hello',
        es: 'Hola',
        pt: 'Olá'
    };

    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        pt: 'Saudações'
    };

    const loggedMessages = {
        en: 'Logged in',
        es: 'Inicío Sesión',
        pt: 'Inicio Sessão'
    }

    // put methods into Greetr prototype
    Greetr.prototype = {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function() {
            if(supportedLangs.indexOf(this.language) === -1)
                throw "Invalid Language!";
        },
        greeting() {
            // return greetings[this.language] + ' ' + this.firstName + '!';
            return `${greetings[this.language]} ${this.firstName}!`
        },
        formalGreeting: function() {
            // return formalGreetings[this.language] + ' ' + this.fullName();
            return `${formalGreetings[this.language]} ${this.fullName()}`
        },
        greet: function(formal) {
            var msg;
            if(formal) msg = this.formalGreeting();
            else msg = this.greeting();

            // output greeting to the console
            if(console) console.log(msg);

            return this;
        },
        log: function() {
            if(console) console.log(`${loggedMessages[this.language]}: ${this.fullName()}`);
            return this;
        },
        setLang(lang) {
            this.language = lang;
            this.validate();
            return this;
        },
        HTMLGreeting(selector, formal) {
            if(!$) throw 'jQUery not loaded';
            if(!selector) throw 'missing jQuery selector';

            var msg;
            if(formal) msg = this.formalGreeting();
            else msg = this.greeting();

            $(selector).html(msg);

            return this;
        }
    };

    Greetr.init = function(firstName = '', lastName = '', language = 'en') {

        // self points to new object created by new operator
        const self = this;
        self.firstName = firstName;
        self.lastName = lastName;
        self.language = language;
        self.validate();

        // this.firstName = firstName || '';
        // this.lastName = lastName || '';
        // this.language = language || 'en';

//    };
    // Greetr.init = function(firstName = '', lastName = '', language = 'en') {

//         var self = this;
//         self.firstName = firstName;
//         self.lastName = lastName;
//         self.language = language;
//         self.validate();
     };

    Greetr.init.prototype = Greetr.prototype;
    // or
    // Greetr.init.prototype = Object.create(Greetr.prototype);

    // attach Greetr to global object and alias it with G$ and expose Greetr function globally
    // attach variables to global obj, and on global, Greetr and G$(alias) will point to local Greetr fn
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));
