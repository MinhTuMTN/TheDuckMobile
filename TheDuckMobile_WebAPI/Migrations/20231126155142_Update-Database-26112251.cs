using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase26112251 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeedbackImagesJson",
                table: "Feedbacks");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "Coupons",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_CustomerId",
                table: "Coupons",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Users_CustomerId",
                table: "Coupons",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Users_CustomerId",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_CustomerId",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Coupons");

            migrationBuilder.AddColumn<string>(
                name: "FeedbackImagesJson",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
