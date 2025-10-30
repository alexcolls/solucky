use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use solana_program::entrypoint::ProgramResult;
use anchor_lang::__private::CLOSED_ACCOUNT_DISCRIMINATOR;
use std::io::{Cursor, Write};
use std::ops::DerefMut;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("fH2j1AXaGr14kCroRseuetQsJmi6rij1NNqkBicdksr");

#[program]
mod solucky_lotto {
    
    use super::*;
    
    pub fn send_ticket(ctx: Context<SendTicket>, number: i32, country: String) -> ProgramResult {
        let ticket: &mut Account<Ticket> = &mut ctx.accounts.ticket;
        let owner: &Signer = &ctx.accounts.owner;
        let clock: Clock = Clock::get().unwrap();

        ticket.owner = *owner.key;
        ticket.timestamp = clock.unix_timestamp;
        ticket.number = number;
        ticket.country = country;

        //let payer: Pubkey = 

    //     let amount = 100000000;
    //     msg!("Received request to transfer {:?} lamports from {:?} to {:?}.", 
    //         amount, *owner.key, payee.key);
    //     msg!("  Processing transfer...");

    //     // Transfer from PAYER to PAYEE a specific amount:
    //     invoke(
    //         &system_instruction::transfer(*owner.key, payee.key, amount),
    //         &[payer.clone(), payee.clone()],
    //     )?;
    
    // msg!("Transfer completed successfully.");

        Ok(())
    }

    pub fn delete_ticket(_ctx: Context<DeleteTicket>) -> ProgramResult {
        Ok(())
    }

    pub fn delete_tickets(_ctx: Context<DeleteTickets>) -> ProgramResult {
        Ok(())
    }

    pub fn close(ctx: Context<Close>) -> ProgramResult {
        let dest_starting_lamports = ctx.accounts.destination.lamports();

        let account = ctx.accounts.account.to_account_info();
        **ctx.accounts.destination.lamports.borrow_mut() = dest_starting_lamports
            .checked_add(account.lamports())
            .unwrap();
        **account.lamports.borrow_mut() = 0;

        let mut data = account.try_borrow_mut_data()?;
        for byte in data.deref_mut().iter_mut() {
            *byte = 0;
        }

        let dst: &mut [u8] = &mut data;
        let mut cursor = Cursor::new(dst);
        cursor.write_all(&CLOSED_ACCOUNT_DISCRIMINATOR).unwrap();

        Ok(())
    }

    pub fn force_defund(ctx: Context<ForceDefund>) -> ProgramResult {
        let account = &ctx.accounts.account;

        let data = account.try_borrow_data()?;
        assert!(data.len() > 8);

        let mut discriminator = [0u8; 8];
        discriminator.copy_from_slice(&data[0..8]);
        if discriminator != CLOSED_ACCOUNT_DISCRIMINATOR {
            return Err(ProgramError::InvalidAccountData);
        }

        let dest_starting_lamports = ctx.accounts.destination.lamports();

        **ctx.accounts.destination.lamports.borrow_mut() = dest_starting_lamports
            .checked_add(account.lamports())
            .unwrap();
        **account.lamports.borrow_mut() = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct DeleteTicket<'info> {
    #[account(mut, has_one = owner, close = owner)]
    pub ticket: Account<'info, Ticket>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteTickets<'info> {
    #[account(mut, close = owner)]
    pub ticket: Account<'info, Ticket>,
    pub owner: AccountInfo<'info>
}

#[derive(Accounts)]
pub struct SendTicket<'info> {
    #[account(init, payer = owner, space = Ticket::LEN)]
    pub ticket: Account<'info, Ticket>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

// 1. Define the structure of the Ticket account.
#[account]
pub struct Ticket {
    pub owner: Pubkey,
    pub timestamp: i64,
    pub number: i32,
    pub country: String,
}

// 2. Add some useful constants for sizing propeties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const NUMBER_LENGTH: usize = 4;
const COUNTRY_LENGTH: usize = 4 * 4; // 4 chars max.

// 3. Add a constant on the Tweet account that provides its total size.
impl Ticket {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Owner.
        + TIMESTAMP_LENGTH // Timestamp.
        + NUMBER_LENGTH // Number.
        + COUNTRY_LENGTH; // Country.
}

#[derive(Accounts)]
pub struct Close<'info> {
    account: Account<'info, Ticket>,
    destination: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ForceDefund<'info> {
    account: AccountInfo<'info>,
    destination: AccountInfo<'info>,
}
