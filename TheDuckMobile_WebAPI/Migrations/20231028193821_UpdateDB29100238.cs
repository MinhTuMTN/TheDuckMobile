using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDB29100238 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Addresss",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Addresss_UserId",
                table: "Addresss",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresss_Users_UserId",
                table: "Addresss",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresss_Users_UserId",
                table: "Addresss");

            migrationBuilder.DropIndex(
                name: "IX_Addresss_UserId",
                table: "Addresss");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Addresss");
        }
    }
}
