using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase18111046 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVersions_Products_ProductId",
                table: "ProductVersions");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVersions_Promotions_PromotionId",
                table: "ProductVersions");

            migrationBuilder.DropIndex(
                name: "IX_ProductVersions_PromotionId",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "PromotionId",
                table: "ProductVersions");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductVersionId",
                table: "Promotions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "ProductVersions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PromotionPrice",
                table: "ProductVersions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sold",
                table: "ProductVersions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_ProductVersionId",
                table: "Promotions",
                column: "ProductVersionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVersions_Products_ProductId",
                table: "ProductVersions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_ProductVersions_ProductVersionId",
                table: "Promotions",
                column: "ProductVersionId",
                principalTable: "ProductVersions",
                principalColumn: "ProductVersionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductVersions_Products_ProductId",
                table: "ProductVersions");

            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_ProductVersions_ProductVersionId",
                table: "Promotions");

            migrationBuilder.DropIndex(
                name: "IX_Promotions_ProductVersionId",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "ProductVersionId",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "PromotionPrice",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "Sold",
                table: "ProductVersions");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "ProductVersions",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "PromotionId",
                table: "ProductVersions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ProductVersions_PromotionId",
                table: "ProductVersions",
                column: "PromotionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVersions_Products_ProductId",
                table: "ProductVersions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVersions_Promotions_PromotionId",
                table: "ProductVersions",
                column: "PromotionId",
                principalTable: "Promotions",
                principalColumn: "PromotionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
