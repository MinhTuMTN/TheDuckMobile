using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase18111534 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SelectionValues_CatalogAttributes_Key",
                table: "SelectionValues");

            migrationBuilder.DropIndex(
                name: "IX_SelectionValues_Key",
                table: "SelectionValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CatalogAttributes",
                table: "CatalogAttributes");

            migrationBuilder.DropColumn(
                name: "Key",
                table: "SelectionValues");

            migrationBuilder.AddColumn<int>(
                name: "CatalogAttributeId",
                table: "SelectionValues",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VersionName",
                table: "ProductVersions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "CatalogAttributes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "CatalogAttributeId",
                table: "CatalogAttributes",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CatalogAttributes",
                table: "CatalogAttributes",
                column: "CatalogAttributeId");

            migrationBuilder.CreateIndex(
                name: "IX_SelectionValues_CatalogAttributeId",
                table: "SelectionValues",
                column: "CatalogAttributeId");

            migrationBuilder.AddForeignKey(
                name: "FK_SelectionValues_CatalogAttributes_CatalogAttributeId",
                table: "SelectionValues",
                column: "CatalogAttributeId",
                principalTable: "CatalogAttributes",
                principalColumn: "CatalogAttributeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SelectionValues_CatalogAttributes_CatalogAttributeId",
                table: "SelectionValues");

            migrationBuilder.DropIndex(
                name: "IX_SelectionValues_CatalogAttributeId",
                table: "SelectionValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CatalogAttributes",
                table: "CatalogAttributes");

            migrationBuilder.DropColumn(
                name: "CatalogAttributeId",
                table: "SelectionValues");

            migrationBuilder.DropColumn(
                name: "VersionName",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "CatalogAttributeId",
                table: "CatalogAttributes");

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "SelectionValues",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "CatalogAttributes",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CatalogAttributes",
                table: "CatalogAttributes",
                column: "Key");

            migrationBuilder.CreateIndex(
                name: "IX_SelectionValues_Key",
                table: "SelectionValues",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_SelectionValues_CatalogAttributes_Key",
                table: "SelectionValues",
                column: "Key",
                principalTable: "CatalogAttributes",
                principalColumn: "Key");
        }
    }
}
