using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabase2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_CustomerId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVersions_Brands_BrandId",
                table: "ProductVersions");

            migrationBuilder.DropIndex(
                name: "IX_ProductVersions_BrandId",
                table: "ProductVersions");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_CustomerId",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "ProductVersions");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Feedbacks");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerUserId",
                table: "Feedbacks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_CustomerUserId",
                table: "Feedbacks",
                column: "CustomerUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_CustomerUserId",
                table: "Feedbacks",
                column: "CustomerUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_CustomerUserId",
                table: "Feedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_CustomerUserId",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "CustomerUserId",
                table: "Feedbacks");

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "ProductVersions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "Feedbacks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ProductVersions_BrandId",
                table: "ProductVersions",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_CustomerId",
                table: "Feedbacks",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_CustomerId",
                table: "Feedbacks",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVersions_Brands_BrandId",
                table: "ProductVersions",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "BrandId");
        }
    }
}
