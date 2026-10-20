// frontend/src/modules/dictation/mockDictationData.ts
// Kho học liệu Video YouTube chọn lọc chuẩn học thuật (TED-Ed, TED) với timestamps khớp chính xác từng câu 100% với giọng đọc trong clip

import { DictationLesson } from './types';

export const mockDictationLessons: DictationLesson[] = [
  {
    id: 'ted-ed-sleep-benefits',
    youtubeId: 'gedoSfZvBgE',
    title: "The benefits of a good night's sleep - Why do we sleep?",
    channel: 'TED-Ed (Shai Marcu)',
    level: 'B2',
    topic: 'Khoa học',
    duration: '05:45',
    description:
      'Khám phá cơ chế thần kinh học của giấc ngủ và cách bộ não củng cố trí nhớ dài hạn trong khi chúng ta nghỉ ngơi.',
    sentences: [
      {
        id: 1,
        start: 7.3,
        end: 16.1,
        text: "It's 4 a.m., and the big test is in eight hours, followed by a piano recital.",
        translationVi:
          'Bây giờ là 4 giờ sáng, kỳ thi lớn sẽ diễn ra sau 8 tiếng nữa, tiếp theo là buổi biểu diễn piano.',
      },
      {
        id: 2,
        start: 16.1,
        end: 21.9,
        text: "You've been studying and playing for days, but you still don't feel ready for either.",
        translationVi:
          'Bạn đã ôn bài và luyện đàn suốt nhiều ngày, nhưng bạn vẫn chưa cảm thấy sẵn sàng cho cả hai.',
      },
      {
        id: 3,
        start: 21.9,
        end: 28.1,
        text: 'So, what can you do? Well, you can drink another cup of coffee and spend the next few hours cramming and practicing,',
        translationVi:
          'Vậy bạn có thể làm gì? Bạn có thể uống thêm một tách cà phê và dành vài giờ tới để học nhồi nhét và tập luyện,',
      },
      {
        id: 4,
        start: 28.1,
        end: 35.8,
        text: 'but believe it or not, you might be better off closing the books, putting away the music, and going to sleep.',
        translationVi:
          'nhưng tin hay không tùy bạn, tốt hơn hết bạn nên gấp sách lại, cất bản nhạc đi và lên giường đi ngủ.',
      },
      {
        id: 5,
        start: 35.8,
        end: 43.2,
        text: 'Sleep occupies nearly a third of our lives, but many of us give surprisingly little attention and care to it.',
        translationVi:
          'Giấc ngủ chiếm gần một phần ba cuộc đời chúng ta, nhưng nhiều người lại dành sự quan tâm và chăm sóc đáng ngạc nhiên là rất ít cho nó.',
      },
      {
        id: 6,
        start: 43.2,
        end: 46.7,
        text: 'This neglect is often the result of a major misunderstanding.',
        translationVi:
          'Sự thờ ơ này thường là hệ quả của một sự hiểu lầm nghiêm trọng.',
      },
      {
        id: 7,
        start: 46.7,
        end: 52.3,
        text: "Sleep isn't lost time, or just a way to rest when all our important work is done.",
        translationVi:
          'Giấc ngủ không phải là thời gian lãng phí, hay chỉ là cách để nghỉ ngơi khi mọi việc quan trọng đã xong.',
      },
      {
        id: 8,
        start: 52.3,
        end: 65.4,
        text: "Instead, it's a critical function, during which your body balances and regulates its vital systems, affecting respiration and regulating everything from circulation to growth and immune response.",
        translationVi:
          'Thay vào đó, nó là một chức năng sống còn giúp cơ thể cân bằng và điều hòa các hệ thống thiết yếu, tác động đến hô hấp và điều tiết mọi thứ từ tuần hoàn đến tăng trưởng và phản ứng miễn dịch.',
      },
    ],
  },
  {
    id: 'ted-ed-how-memories-form',
    youtubeId: 'yOgAbKJGrTA',
    title: 'How memories form and how we lose them',
    channel: 'TED-Ed (Catharine Young)',
    level: 'C1',
    topic: 'Khoa học',
    duration: '04:19',
    description:
      'Tìm hiểu cách các tế bào thần kinh tạo kết nối khớp thần kinh (synapses) để lưu giữ ký ức và nguyên nhân gây suy giảm trí nhớ.',
    sentences: [
      {
        id: 1,
        start: 6.8,
        end: 15.0,
        text: 'Think back to a really vivid memory. Got it? Okay, now try to remember what you had for lunch three weeks ago.',
        translationVi:
          'Hãy nhớ lại một ký ức thật sống động. Nhớ ra chưa? Được rồi, giờ hãy thử nhớ xem bạn đã ăn gì vào bữa trưa cách đây ba tuần.',
      },
      {
        id: 2,
        start: 15.0,
        end: 19.9,
        text: "That second memory probably isn't as strong, but why not?",
        translationVi:
          'Ký ức thứ hai đó có lẽ không rõ nét bằng, nhưng tại sao lại như vậy?',
      },
      {
        id: 3,
        start: 19.9,
        end: 26.5,
        text: 'Why do we remember some things, and not others? And why do memories eventually fade?',
        translationVi:
          'Tại sao chúng ta nhớ một số chuyện mà lại quên những chuyện khác? Và tại sao ký ức cuối cùng lại phai nhạt?',
      },
      {
        id: 4,
        start: 26.5,
        end: 29.7,
        text: "Let's look at how memories form in the first place.",
        translationVi:
          'Trước hết, hãy cùng tìm hiểu cách ký ức được hình thành như thế nào.',
      },
      {
        id: 5,
        start: 29.7,
        end: 40.0,
        text: 'When you experience something, like dialing a phone number, the experience is converted into a pulse of electrical energy that zips along a network of neurons.',
        translationVi:
          'Khi bạn trải nghiệm điều gì đó, chẳng hạn như bấm số điện thoại, trải nghiệm đó được chuyển hóa thành một xung năng lượng điện chạy dọc theo mạng lưới các tế bào thần kinh.',
      },
      {
        id: 6,
        start: 40.0,
        end: 47.4,
        text: "Information first lands in short term memory, where it's available from anywhere from a few seconds to a couple of minutes.",
        translationVi:
          'Thông tin trước tiên đi vào trí nhớ ngắn hạn, nơi nó được lưu giữ trong khoảng từ vài giây đến vài phút.',
      },
      {
        id: 7,
        start: 47.4,
        end: 55.4,
        text: "It's then transferred to long-term memory through areas such as the hippocampus, and finally to several storage regions across the brain.",
        translationVi:
          'Sau đó nó được chuyển sang trí nhớ dài hạn thông qua các vùng như hồi hải mã, và cuối cùng đến nhiều vùng lưu trữ khắp não bộ.',
      },
    ],
  },
  {
    id: 'ted-ed-stress-brain',
    youtubeId: 'WuyPuH9ojCE',
    title: 'How stress affects your brain - Neuroscience & Health',
    channel: 'TED-Ed (Madhumita Murgia)',
    level: 'B2',
    topic: 'Khoa học',
    duration: '04:15',
    description:
      'Phân tích tác động của căng thẳng mãn tính (chronic stress) lên cấu trúc não bộ, trục HPA và khả năng ghi nhớ của con người.',
    sentences: [
      {
        id: 1,
        start: 6.8,
        end: 14.6,
        text: 'Are you sleeping restlessly, feeling irritable or moody, forgetting little things, and feeling overwhelmed and isolated?',
        translationVi:
          'Bạn có đang ngủ trằn trọc, cảm thấy dễ cáu gắt hoặc thất thường, hay quên những điều nhỏ nhặt và thấy quá tải, cô lập không?',
      },
      {
        id: 2,
        start: 14.6,
        end: 18.8,
        text: "Don't worry. We've all been there. You're probably just stressed out.",
        translationVi:
          'Đừng lo lắng. Tất cả chúng ta đều từng trải qua cảm giác đó. Có lẽ bạn chỉ đang bị căng thẳng mà thôi.',
      },
      {
        id: 3,
        start: 18.8,
        end: 21.0,
        text: "Stress isn't always a bad thing.",
        translationVi: 'Căng thẳng không phải lúc nào cũng là điều xấu.',
      },
      {
        id: 4,
        start: 21.0,
        end: 28.5,
        text: "It can be handy for a burst of extra energy and focus, like when you're playing a competitive sport, or have to speak in public.",
        translationVi:
          'Nó có thể hữu ích để tạo ra một luồng năng lượng và sự tập trung tức thời, như khi bạn thi đấu thể thao hoặc phải phát biểu trước đám đông.',
      },
      {
        id: 5,
        start: 28.5,
        end: 36.9,
        text: 'But when its continuous, the kind most of us face day in and day out, it actually begins to change your brain.',
        translationVi:
          'Nhưng khi nó kéo dài liên tục, kiểu căng thẳng mà hầu hết chúng ta đối mặt ngày này qua ngày khác, nó thực sự bắt đầu làm thay đổi bộ não của bạn.',
      },
      {
        id: 6,
        start: 36.9,
        end: 48.2,
        text: 'Chronic stress, like being overworked or having arguments at home, can affect brain size, its structure, and how it functions, right down to the level of your genes.',
        translationVi:
          'Căng thẳng mãn tính, như làm việc quá sức hay bất hòa trong gia đình, có thể ảnh hưởng đến kích thước, cấu trúc và chức năng não bộ, thậm chí tác động tới tận cấp độ gen.',
      },
    ],
  },
  {
    id: 'ted-master-procrastinator',
    youtubeId: 'arj7oStGLkU',
    title: 'Inside the Mind of a Master Procrastinator - Workplace & Study Habits',
    channel: 'TED (Tim Urban)',
    level: 'B1',
    topic: 'Xã hội',
    duration: '03:50',
    description:
      'Bài diễn thuyết kinh điển về tâm lý học trì hoãn trong học tập và công việc, rèn luyện kỹ năng nghe hiểu giao tiếp tự nhiên.',
    sentences: [
      {
        id: 1,
        start: 12.6,
        end: 19.4,
        text: 'So in college, I was a government major, which means I had to write a lot of papers.',
        translationVi:
          'Hồi đại học, tôi học chuyên ngành quản trị nhà nước, nghĩa là tôi phải viết rất nhiều bài tiểu luận.',
      },
      {
        id: 2,
        start: 19.4,
        end: 23.9,
        text: 'Now, when a normal student writes a paper, they might spread the work out a little like this.',
        translationVi:
          'Khi một sinh viên bình thường viết tiểu luận, họ thường phân bổ công việc đều đặn như thế này.',
      },
      {
        id: 3,
        start: 26.7,
        end: 34.6,
        text: 'You get started maybe a little slowly, but you get enough done in the first week that, with some heavier days later on, everything gets done, things stay civil.',
        translationVi:
          'Bạn có thể khởi đầu hơi chậm một chút, nhưng bạn làm được đủ nhiều trong tuần đầu tiên để rồi với vài ngày làm việc căng hơn sau đó, mọi thứ đều hoàn tất và êm đẹp.',
      },
      {
        id: 4,
        start: 35.9,
        end: 39.3,
        text: 'And I would want to do that like that. That would be the plan.',
        translationVi:
          'Và tôi cũng muốn làm được như vậy. Kế hoạch đặt ra là thế.',
      },
      {
        id: 5,
        start: 39.4,
        end: 46.3,
        text: 'I would have it all ready to go, but then, actually, the paper would come along, and then I would kind of do this.',
        translationVi:
          'Tôi đã chuẩn bị sẵn sàng mọi thứ, nhưng rồi khi bài tiểu luận thực sự đến hạn, tôi lại làm theo kiểu nước đến chân mới nhảy thế này.',
      },
      {
        id: 6,
        start: 48.8,
        end: 57.8,
        text: "And that would happen every single paper. But then came my 90-page senior thesis, a paper you're supposed to spend a year on.",
        translationVi:
          'Và chuyện đó lặp lại ở mọi bài tiểu luận. Nhưng rồi đến khóa luận tốt nghiệp dày 90 trang của tôi, một công trình lẽ ra phải dành cả năm để viết.',
      },
      {
        id: 7,
        start: 57.9,
        end: 61.5,
        text: 'And I knew for a paper like that, my normal work flow was not an option.',
        translationVi:
          'Và tôi biết rằng với một bài khóa luận lớn như thế, cách làm việc thông thường của tôi không còn là một lựa chọn khả thi nữa.',
      },
    ],
  },
  {
    id: 'ted-great-leaders-economy',
    youtubeId: 'qp0HIF3SfI4',
    title: 'How Great Leaders Inspire Action - Innovation & Business Strategy',
    channel: 'TED (Simon Sinek)',
    level: 'B2',
    topic: 'Kinh tế',
    duration: '03:45',
    description:
      'Phân tích mô hình Vòng Tròn Vàng (Golden Circle) giải thích vì sao các tổ chức và nhà lãnh đạo xuất sắc tạo ra đột phá trên thị trường.',
    sentences: [
      {
        id: 1,
        start: 16.3,
        end: 20.2,
        text: "How do you explain when things don't go as we assume?",
        translationVi:
          'Làm sao bạn giải thích được khi mọi việc không diễn ra như chúng ta giả định?',
      },
      {
        id: 2,
        start: 20.3,
        end: 27.2,
        text: 'Or better, how do you explain when others are able to achieve things that seem to defy all of the assumptions?',
        translationVi:
          'Hoặc hơn thế nữa, làm sao giải thích được khi những người khác đạt được những thành tựu dường như thách thức mọi giả định thông thường?',
      },
      {
        id: 3,
        start: 27.3,
        end: 31.2,
        text: 'For example: Why is Apple so innovative?',
        translationVi:
          'Ví dụ: Tại sao tập đoàn Apple lại có khả năng đổi mới sáng tạo mạnh mẽ đến vậy?',
      },
      {
        id: 4,
        start: 31.3,
        end: 38.2,
        text: "Year after year, after year, they're more innovative than all their competition. And yet, they're just a computer company.",
        translationVi:
          'Năm này qua năm khác, họ luôn sáng tạo vượt trội hơn tất cả các đối thủ cạnh tranh. Thế nhưng, suy cho cùng họ cũng chỉ là một công ty máy tính.',
      },
      {
        id: 5,
        start: 38.3,
        end: 45.4,
        text: "They're just like everyone else. They have the same access to the same talent, the same agencies, the same consultants, the same media.",
        translationVi:
          'Họ giống hệt mọi doanh nghiệp khác. Họ có cùng quyền tiếp cận với cùng nguồn nhân tài, các đơn vị tư vấn và truyền thông như nhau.',
      },
      {
        id: 6,
        start: 45.4,
        end: 48.8,
        text: 'Then why is it that they seem to have something different?',
        translationVi:
          'Vậy tại sao họ dường như lại sở hữu một điều gì đó hoàn toàn khác biệt?',
      },
    ],
  },
  {
    id: 'ted-speak-with-confidence',
    youtubeId: 'eIho2S0ZahI',
    title: 'How to Speak So That People Want to Listen - Communication Mastery',
    channel: 'TED (Julian Treasure)',
    level: 'B1',
    topic: 'Công nghệ',
    duration: '04:05',
    description:
      'Chuyên gia âm thanh Julian Treasure hướng dẫn nghệ thuật sử dụng giọng nói và nguyên tắc truyền thông thuyết phục trong kỷ nguyên số.',
    sentences: [
      {
        id: 1,
        start: 14.0,
        end: 17.6,
        text: "The human voice: It's the instrument we all play.",
        translationVi:
          'Giọng nói của con người: Đó là nhạc cụ mà tất cả chúng ta đều chơi.',
      },
      {
        id: 2,
        start: 18.6,
        end: 23.9,
        text: 'It\'s the most powerful sound in the world, probably. It\'s the only one that can start a war or say "I love you."',
        translationVi:
          'Đó có lẽ là âm thanh quyền năng nhất trên thế giới. Nó là âm thanh duy nhất có thể châm ngòi một cuộc chiến hoặc nói lời "Anh yêu em".',
      },
      {
        id: 3,
        start: 23.9,
        end: 28.2,
        text: "And yet many people have the experience that when they speak, people don't listen to them.",
        translationVi:
          'Thế nhưng nhiều người lại gặp phải trải nghiệm rằng khi họ nói, mọi người xung quanh không lắng nghe họ.',
      },
      {
        id: 4,
        start: 28.2,
        end: 33.1,
        text: 'And why is that? How can we speak powerfully to make change in the world?',
        translationVi:
          'Và tại sao lại như vậy? Làm thế nào chúng ta có thể nói chuyện đầy thuyết phục để tạo ra sự thay đổi trên thế giới?',
      },
      {
        id: 5,
        start: 33.5,
        end: 37.7,
        text: "What I'd like to suggest, there are a number of habits that we need to move away from.",
        translationVi:
          'Điều tôi muốn gợi ý là có một số thói quen xấu khi giao tiếp mà chúng ta cần phải từ bỏ.',
      },
      {
        id: 6,
        start: 37.7,
        end: 41.4,
        text: "I've assembled for your pleasure here seven deadly sins of speaking.",
        translationVi:
          'Tôi đã tổng hợp tại đây cho các bạn bảy thói quen tối kỵ khi phát biểu.',
      },
    ],
  },
];
