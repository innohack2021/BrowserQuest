define(['require','character'], function(require, Character) {
    var NpcTalk = {
        "guard": "http://localhost:8081/clovaChat",
        "king": "http://localhost:8081/clovaChat",
        "villagegirl": "http://localhost:8081/clovaChat",
        "villager": "http://localhost:8081/clovaChat",
        "agent": "http://localhost:8081/clovaChat",
        "rick": "http://localhost:8081/clovaChat",
        "scientist": "http://localhost:8081/clovaChat",
        "nyan": "http://localhost:8081/clovaChat",
        "beachnpc": "http://localhost:8081/clovaChat",
        "forestnpc": "http://localhost:8081/clovaChat",
        "desertnpc": "http://localhost:8081/clovaChat",
        "lavanpc": "http://localhost:8081/clovaChat",
        "priest": "http://localhost:8081/clovaChat",
        "sorcerer": "http://localhost:8081/clovaChat",
        "octocat": "http://localhost:8081/clovaChat",
        "coder": "http://localhost:8081/clovaChat",
        "beachnpc": "http://localhost:8081/clovaChat",
        "desertnpc": "http://localhost:8081/clovaChat",
        "othernpc": "http://localhost:8081/clovaChat"
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
        },
        talk: async function() {
            const chatUrl = NpcTalk[this.itemKind];
            var script = "hi stranger";

            console.log(this.itemKind);
            try {
                console.log(`🤍`);
                script = await fetch(chatUrl)
                                    .then(async (response) => await response.json())
                                    .catch((error) => console.log("error:", error));
                console.log(script);
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
