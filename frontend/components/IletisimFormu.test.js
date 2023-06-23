import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
render(<IletisimFormu/>)
});

test('iletişim formu headerı render ediliyor', () => {

    render(<IletisimFormu/>)

    const header = screen.queryByText("İletişim Formu");

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();

});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
   
    render(<IletisimFormu/>)

    const adInput = screen.getByPlaceholderText("İlhan");
    userEvent.type(adInput,"abc");

    const err = await screen.findAllByTestId("error");
    expect(err).toHaveLength(1);

});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
   
    render(<IletisimFormu/>)

    const button = screen.getByRole("button");
    userEvent.click(button);

    const err = await screen.findAllByTestId("error");
    expect(err).toHaveLength(3);

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    
    render(<IletisimFormu/>)

    const adInput = screen.getByPlaceholderText("İlhan");
    userEvent.type(adInput,"abcde");

    const soyadInput = screen.getByPlaceholderText("Mansız");
    userEvent.type(soyadInput,"abcde");

    const button = screen.getByRole("button");
    userEvent.click(button);

    
    const err = await screen.findAllByTestId("error");
    expect(err).toHaveLength(1);

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
   
    render(<IletisimFormu/>)

    const soyadInput = screen.getByLabelText(/Email*/i);
    userEvent.type(soyadInput,"abcde");

    const err = await screen.findByText(/email geçerli bir email adresi olmalıdır./i);
    expect(err).toBeInTheDocument;

    

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    
    render(<IletisimFormu/>)

    const btn = screen.getByText("Gönder");
    userEvent.click(btn);

    const err = await screen.findByText(/Soyad gereklidir./i);
    expect(err).toBeInTheDocument;



});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

    render(<IletisimFormu/>)

    const ad = screen.getByPlaceholderText("İlhan");
    userEvent.type(ad,"Tuğba");

    const soyad = screen.getByPlaceholderText("Mansız");
    userEvent.type(soyad,"Muslu");

    const mail = screen.getByPlaceholderText("yüzyılıngolcüsü@hotmail.com");
    userEvent.type(mail,"ttt@tt.tt");

    const btn = screen.getByText("Gönder");
    userEvent.click(btn);

    const ad2 = screen.queryByText("Tuğba")
    expect(ad2).toBeInTheDocument();

    const soyad2 = screen.queryByText("Muslu")
    expect(soyad2).toBeInTheDocument();

    const mail2 = screen.queryByText("ttt@tt.tt")
    expect(mail2).toBeInTheDocument();

    const message = screen.queryByTestId("messageDisplay")
    expect(message).not.toBeInTheDocument();
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

});
