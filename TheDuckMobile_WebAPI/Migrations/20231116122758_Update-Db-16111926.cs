using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb16111926 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackCamera",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Battery",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Bluetooth",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Buetooth",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "BusRAM",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "ChargingPort",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "FrontCamera",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "GPS",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "GraphicCard",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "HardDrive",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "HeadphoneJack",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "InternalMemory",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Material",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "NetworkType",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "NumberOfSim",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "RAM",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "ScreenResolution",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "ScreenSize",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "SecurityFeature",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "SmartWatch_GPS",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "SmartWatch_InternalMemory",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "SmartWatch_WaterResistance",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Sold",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_BackCamera",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_Bluetooth",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_ChargingPort",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_FrontCamera",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_GPS",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_HeadphoneJack",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_InternalMemory",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_NetworkType",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Tablet_Wifi",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "TypeOfRAM",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "WatchFaceShape",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "WaterResistance",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Wifi",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "WireMaterial",
                table: "ProductVersions");

            migrationBuilder.RenameColumn(
                name: "WifiStandard",
                table: "ProductVersions",
                newName: "Specification");

            migrationBuilder.CreateTable(
                name: "CatalogAttributes",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CatalogId = table.Column<int>(type: "int", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogAttributes", x => x.Key);
                    table.ForeignKey(
                        name: "FK_CatalogAttributes_Catalogs_CatalogId",
                        column: x => x.CatalogId,
                        principalTable: "Catalogs",
                        principalColumn: "CatalogId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SelectionValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectionValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelectionValues_CatalogAttributes_Key",
                        column: x => x.Key,
                        principalTable: "CatalogAttributes",
                        principalColumn: "Key");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogAttributes_CatalogId",
                table: "CatalogAttributes",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_SelectionValues_Key",
                table: "SelectionValues",
                column: "Key");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectionValues");

            migrationBuilder.DropTable(
                name: "CatalogAttributes");

            migrationBuilder.RenameColumn(
                name: "Specification",
                table: "ProductVersions",
                newName: "WifiStandard");

            migrationBuilder.AddColumn<string>(
                name: "BackCamera",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Battery",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Bluetooth",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Buetooth",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BusRAM",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChargingPort",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FrontCamera",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "GPS",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GraphicCard",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HardDrive",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HeadphoneJack",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InternalMemory",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Material",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NetworkType",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSim",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RAM",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ScreenResolution",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "ScreenSize",
                table: "ProductVersions",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "SecurityFeature",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SmartWatch_GPS",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SmartWatch_InternalMemory",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SmartWatch_WaterResistance",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sold",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tablet_BackCamera",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Tablet_Bluetooth",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tablet_ChargingPort",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tablet_FrontCamera",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Tablet_GPS",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Tablet_HeadphoneJack",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Tablet_InternalMemory",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tablet_NetworkType",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Tablet_Wifi",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfRAM",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WatchFaceShape",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WaterResistance",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Wifi",
                table: "ProductVersions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WireMaterial",
                table: "ProductVersions",
                type: "int",
                nullable: true);
        }
    }
}
