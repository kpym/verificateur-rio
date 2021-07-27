// Le fichier js qui génère la signature





var app = new Vue({
  el: '#app',
  data: {
    tel:       '',
    rio:       '',
    oo:        '',
    q:         '',
    rrrrrr:    '',
    ccc:       '',
    okLenTel: true,
    okLenRio: true,
    operateur: '',
  },
  watch: {
    tel: function (val) {
      // On normalise le numéro de téléphone pour être de la forme 0XXXXXXXXX.
      this.tel = val.replace(/\s/g, '').replace(/\+330?/g, '0').substr(0,10)
    }
  },
  computed: {
    rio: {
      // getter
      get: function () {
        return this.oo + this.q + this.rrrrrr + this.ccc
      },
      // setter
      set: function (newValue) {
        // On normalise le RIO
        newValue = newValue.toUpperCase().replace(/\s/g, '').substr(0,12);

        this.oo = newValue.substr(0,2);
        this.q = newValue.substr(2,1);
        this.rrrrrr = newValue.substr(3,6);
        this.ccc = newValue.substr(9,3);
      }
    },
    okLenTel : function () {
      return this.tel.length == 0 || this.tel.length == 10
    },
    okLenRio : function () {
      rio = this.rio.replace(/\s/g, '');
      return rio.length == 0 || rio.length == 12
    },
    operateur : function () {
      if (this.oo) {
        return operateurs.filter(o => o.prefix == this.oo).map(o => o.nom).join(", ") || "[inconnu]"
      }
      return ""
    },
    type : function () {
      // on pourrait aussi vérifier si oo[0] > "E"
      if (this.oo) {
        return operateurs.filter(o => o.prefix == this.oo).map(o => o.type)[0] || "[inconnu]"
      }
      return ""
    },
    qtype : function () {
      if (!this.q) {
        return ""
      }
      switch (this.q) {
        case 'E':
          return "entreprise"
        case 'P':
          return "particulier"
        default:
          return "[inconnu]"
      }
    },
    riotel : function () {
      if (this.rio.length < 9 || this.tel.length != 10) {
        return ""
      }
      return this.rio.substr(0,9) + this.tel
    },
    abc : function () {
      ordre = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+"; // caractères utilisés pour le codage (37 différents)

      if (this.tel.length != 10 || this.rio.length < 9) {
        return ""
      }
      a = b = c = 0 // initialisation de a, b et c
      for (const ch of this.riotel) {
          position  = ordre.indexOf(ch);
          a = (1 * a + position) % 37;
          b = (2 * b + position) % 37;
          c = (4 * c + position) % 37;
      }
      return ordre[a] + ordre[b] + ordre[c]
    }
  }
})