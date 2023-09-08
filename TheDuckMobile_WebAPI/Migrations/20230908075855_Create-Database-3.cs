using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabase3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
