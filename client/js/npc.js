define(['require','character'], function(require, Character) {
    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
        },
        talk: async function(description) {
            const chatUrl = "http://localhost:8081/clovaChat";
            var script = "hi stranger";
            console.log(this.itemKind);
            try {
                const fetchInit = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description,
                        npc: this.itemKind
                    }),
                }
                script = await fetch(chatUrl, fetchInit)
                                    .then(async (response) => await response.json())
                                    .catch((error) => console.log("error:", error));
                script = script.chat
            } catch(e) {
                console.log('💔', e)
                // Exception triggered when config_local.json does not exist. Nothing to do here.
            }
            return script;
        }
    });
    return Npc;
});
