import { utilService } from "@/services";



describe('changeToSlug', () => {
  it('should correctly replace special characters with their corresponding replacements', () => {
    const title = 'Đi chơi với bạn bè';
    const prefix = 'test-prefix';
    const expectedSlug = 'di-choi-voi-ban-be-test-prefix';
    expect(utilService.changeToSlug(title, prefix)).toBe(expectedSlug);
  });

  it('should correctly replace spaces with hyphens', () => {
    const title = 'Hello world!';
    const prefix = 'test-prefix';
    const expectedSlug = 'hello-world-test-prefix';
    expect(utilService.changeToSlug(title, prefix)).toBe(expectedSlug);
  });

  it('should correctly handle multi-dash sequences', () => {
    const title = 'Hello--world---!';
    const prefix = 'test-prefix';
    const expectedSlug = 'hello-world-test-prefix';
    expect(utilService.changeToSlug(title, prefix)).toBe(expectedSlug);
  });

  it('should handle the case where the title only contains special characters', () => {
    const title = '!@#$%^&*()';
    const prefix = 'test-prefix';
    const expectedSlug = 'test-prefix';
    expect(utilService.changeToSlug(title, prefix)).toBe(expectedSlug);
  });

  it('should handle the case where the title is an empty string', () => {
    const title = '';
    const prefix = 'test-prefix';
    const expectedSlug = 'test-prefix';
    expect(utilService.changeToSlug(title, prefix)).toBe(expectedSlug);
  });
});
