using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase17110054 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Catalogs_CatalogId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_OSs_OSId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "OSId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CatalogId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Catalogs_CatalogId",
                table: "Products",
                column: "CatalogId",
                principalTable: "Catalogs",
                principalColumn: "CatalogId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_OSs_OSId",
                table: "Products",
                column: "OSId",
                principalTable: "OSs",
                principalColumn: "OSId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Catalogs_CatalogId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_OSs_OSId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "OSId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CatalogId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Catalogs_CatalogId",
                table: "Products",
                column: "CatalogId",
                principalTable: "Catalogs",
                principalColumn: "CatalogId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_OSs_OSId",
                table: "Products",
                column: "OSId",
                principalTable: "OSs",
                principalColumn: "OSId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
