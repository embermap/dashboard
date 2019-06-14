import { Server, RestSerializer, Model } from "@miragejs/server";

window.server = new Server({
  models: {
    todo: Model
  },

  serializers: {
    application: RestSerializer.extend({
      root: false,
      embed: true
    })
  },

  baseConfig() {
    this.namespace = "api";

    this.resource("todo");
  },

  scenarios: {
    default(server) {
      // Ryan
      server.create("todo", {
        author: "Ryan",
        text: "Ship newsletters",
        position: 1
      });

      // Sam
      server.create("todo", {
        author: "Sam",
        text: "Add showImportPaths option to AddonDocs",
        position: 2
      });
      server.create("todo", {
        author: "Sam",
        text: "Ember Animated vid",
        position: 1
      });
      server.create("todo", {
        author: "Sam",
        text: "Lorem",
        position: 3
      });
      server.create("todo", {
        author: "Sam",
        text: "Ipsum",
        position: 4
      });
    }
  }
});
