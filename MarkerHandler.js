AFRAME.registerComponent("markerhandler",{
    init: async function() {
        this.el.addEventListener("markerFound", ()=>{
            console.log("Se encontró el marcador");
            this.handlerMarkerFound();
        }),
        this.el.addEventListener("markerLost", ()=> {
            console.log("Se perdió el marcador");
            this.handlerMarkerLost();
        })
    },
    handlerMarkerFound: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var orderButton = document.getElementById("order-button");
        var orderSummaryButton = document.getElementById("order-summary-button");

        orderButton.addEventListener("click", () => {
            swal({
                icon: "",
                title: "¡Gracias por tu orden!",
                text: "",
                timer: 2000,
                buttons: false
            });
        });

        orderSummaryButton.addEventListener("click", () => {
            swal({
                icon: "warning",
                title: "Resumen de la orden",
                text: "Operacion en curso",
            });
        });
        
    },
    handleMarkerLost: function () {
        
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    },
    getAllToys: async function(){
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
    }
})