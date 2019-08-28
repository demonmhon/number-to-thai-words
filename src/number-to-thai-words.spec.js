const { expect } = require('chai');
const words = require('./number-to-thai-words');

describe('Reading', () => {
  it('should not convert very small amount', () => {
    expect(words(0)).to.equal('');
    expect(words(0.0001)).to.equal('');
    expect(words(0.001)).to.equal('');
    expect(words(0.009)).to.equal('');
  });

  it('should convert to Satang', () => {
    expect(words(0.01)).to.equal('หนึ่งสตางค์');
    expect(words(0.10)).to.equal('สิบสตางค์');
    expect(words(0.11)).to.equal('สิบเอ็ดสตางค์');
    expect(words(0.12)).to.equal('สิบสองสตางค์');
    expect(words(0.20)).to.equal('ยี่สิบสตางค์');
    expect(words(0.21)).to.equal('ยี่สิบเอ็ดสตางค์');
    expect(words(0.25)).to.equal('ยี่สิบห้าสตางค์');
    expect(words(0.50)).to.equal('ห้าสิบสตางค์');
    expect(words(0.75)).to.equal('เจ็ดสิบห้าสตางค์');
    expect(words(0.99)).to.equal('เก้าสิบเก้าสตางค์');
  });

  it('should convert to Satang without second digit', () => {
    expect(words(0.1)).to.equal('สิบสตางค์');
    expect(words(0.2)).to.equal('ยี่สิบสตางค์');
    expect(words(0.5)).to.equal('ห้าสิบสตางค์');
  });

  it('should convert to Satang with only 2 decimal places', () => {
    expect(words(0.123)).to.equal('สิบสองสตางค์');
    expect(words(0.255)).to.equal('ยี่สิบห้าสตางค์');
    expect(words(0.315)).to.equal('สามสิบเอ็ดสตางค์');
    expect(words(0.999)).to.equal('เก้าสิบเก้าสตางค์');
    expect(words(0.88888)).to.equal('แปดสิบแปดสตางค์');
  });

  it('should convert to Baht', () => {
    expect(words(1)).to.equal('หนึ่งบาทถ้วน');
    expect(words(10)).to.equal('สิบบาทถ้วน');
    expect(words(11)).to.equal('สิบเอ็ดบาทถ้วน');
    expect(words(12)).to.equal('สิบสองบาทถ้วน');
    expect(words(20)).to.equal('ยี่สิบบาทถ้วน');
    expect(words(21)).to.equal('ยี่สิบเอ็ดบาทถ้วน');
    expect(words(22)).to.equal('ยี่สิบสองบาทถ้วน');
    expect(words(100)).to.equal('หนึ่งร้อยบาทถ้วน');
    expect(words(101)).to.equal('หนึ่งร้อยเอ็ดบาทถ้วน');
    expect(words(111)).to.equal('หนึ่งร้อยสิบเอ็ดบาทถ้วน');
    expect(words(121)).to.equal('หนึ่งร้อยยี่สิบเอ็ดบาทถ้วน');
    expect(words(1000)).to.equal('หนึ่งพันบาทถ้วน');
    expect(words(1001)).to.equal('หนึ่งพันเอ็ดบาทถ้วน');
    expect(words(10000)).to.equal('หนึ่งหมื่นบาทถ้วน');
    expect(words(100000)).to.equal('หนึ่งแสนบาทถ้วน');
    expect(words(1000000)).to.equal('หนึ่งล้านบาทถ้วน');
  });

  it('should convert more than million to Baht', () => {
    expect(words(1000001)).to.equal('หนึ่งล้านเอ็ดบาทถ้วน');
    expect(words(11000001)).to.equal('สิบเอ็ดล้านเอ็ดบาทถ้วน');
    expect(words(10000000)).to.equal('สิบล้านบาทถ้วน');
    expect(words(11000000)).to.equal('สิบเอ็ดล้านบาทถ้วน');
    expect(words(1000000000001)).to.equal('หนึ่งล้านล้านเอ็ดบาทถ้วน');
    expect(words(1000000000000)).to.equal('หนึ่งล้านล้านบาทถ้วน');
    expect(words(1001000000001)).to.equal('หนึ่งล้านหนึ่งพันล้านเอ็ดบาทถ้วน');
    expect(words(1001000001001)).to.equal('หนึ่งล้านหนึ่งพันล้านหนึ่งพันเอ็ดบาทถ้วน');
    expect(words(1001000000000)).to.equal('หนึ่งล้านหนึ่งพันล้านบาทถ้วน');
    expect(words(100000000)).to.equal('หนึ่งร้อยล้านบาทถ้วน');
    expect(words(1000000000)).to.equal('หนึ่งพันล้านบาทถ้วน');
    expect(words(1000000000000000000)).to.equal('หนึ่งล้านล้านล้านบาทถ้วน');
  });

  it('should convert complex number to Baht', () => {
    expect(words(6321298)).to.equal(
      'หกล้านสามแสนสองหมื่นหนึ่งพันสองร้อยเก้าสิบแปดบาทถ้วน'
    );
    expect(words(10034567)).to.equal(
      'สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
    expect(words(20034567)).to.equal(
      'ยี่สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
    expect(words(30034567.0)).to.equal(
      'สามสิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
    );
  });

  it('should convert number to Baht with Satang', () => {
    expect(words(1.5)).to.equal('หนึ่งบาทห้าสิบสตางค์');
    expect(words(1.500)).to.equal('หนึ่งบาทห้าสิบสตางค์');
    expect(words(1.99)).to.equal('หนึ่งบาทเก้าสิบเก้าสตางค์');
    expect(words(2.42)).to.equal('สองบาทสี่สิบสองสตางค์');
    expect(words(11.25)).to.equal('สิบเอ็ดบาทยี่สิบห้าสตางค์');
    expect(words(100.5)).to.equal('หนึ่งร้อยบาทห้าสิบสตางค์');
    expect(words(567.01)).to.equal('ห้าร้อยหกสิบเจ็ดบาทหนึ่งสตางค์');
    expect(words(123456789.999)).to.equal(
    'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
    );
  });
});
