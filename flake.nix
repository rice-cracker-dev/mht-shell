{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    ags,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    extraPackages = with ags.packages.${system}; [
      apps
      battery
      bluetooth
      cava
      hyprland
      mpris
      network
      notifd
      tray
      wireplumber
    ];
  in {
    packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./src;
        name = "mht-shell";
        entry = "app.ts";

        # additional libraries and executables to add to gjs' runtime
        inherit extraPackages;
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          pkgs.inotify-tools
          pkgs.bun

          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            inherit extraPackages;
          })
        ];
      };
    };
  };
}
